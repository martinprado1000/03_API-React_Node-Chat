import { createContext, useContext, useState } from "react";
const URL_BACK = import.meta.env.VITE_URL_BACK;

const MessagesContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useMessagesContext() {
  return useContext(MessagesContext);
}

// Provider
export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      let res = await fetch(`${URL_BACK}/api/messages`);
      let responsBackend = await res.json();
      if (responsBackend.status == 200) {
        setMessages(responsBackend.data);
        return;
      }
      if (responsBackend.status == 404) {
        setMessages(false);
        return;
      }
      throw error()
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      window.location.href = "/fatalErrorPage";
      return;
    }
  };

  return (
    <MessagesContext.Provider value={{ getMessages, messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}
