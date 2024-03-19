import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthUserContext";
import { useUsersContext } from "../../contexts/UsersContext";
import { useMessagesContext } from "../../contexts/MessagesContext";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import io from "socket.io-client";
const URL_BACK = import.meta.env.VITE_URL_BACK  // Asi obtengo las varables de entorno con Vite, import.meta.env. y el nombre de la variable.

const socket = io(URL_BACK);

function BodyChat() {
  const { userAuth } = useAuthContext();
  const { getUsers, users, setUsers } = useUsersContext();
  const { getMessages, messages, setMessages } = useMessagesContext();

  //setUsers(users.filter((user)=>user.name != userAuth.name))

  //const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    socket.emit("message", { message: newMessage, owner: userAuth.email });
    setMessages([...messages, { message: newMessage, owner: userAuth.email }]);
    setNewMessage("");
  };

  socket.on("message", (data) => {
    if (Array.isArray(messages)) {
      setMessages([...messages, { message: data.message, owner: data.owner }]);
    } else {
      setMessages([{ message: data.message, owner: data.owner }]);
    }
  });

  useEffect(() => {
    getUsers();
    getMessages();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container fluid>
      <Row>
        <Col xs={3} className="my-4 mx-2" style={{ height: "80vh" }}>
          <p className="text-center text-primary">Usuarios</p>
          <ListGroup>
            {users &&
              users
                .filter((user) => user.name != userAuth.name)
                .map((user) => (
                  <ListGroup.Item key={user.id} className="bg-dark text-white">
                    {user.name}
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Col>

        <Col xs={8} className="my-4 mx-2 bg-dark rounded thumbnail">
          {messages ? (
            <div
              className="my-2 mx-2 bg-dark"
              style={{ height: "calc(70vh - 56px)", overflowY: "scroll" }}
            >
              {messages.map((message, index) =>
                message.owner == userAuth.email ? (
                  <p
                    key={index}
                    className="mx-2 text-center text-primary"
                    style={{ wordWrap: "break-word" }}
                  >
                    <strong>Yo:</strong> {message.message}
                  </p>
                ) : (
                  <p
                    key={index}
                    className="mx-2"
                    style={{ wordWrap: "break-word" }}
                  >
                    <strong>{message.owner}:</strong> {message.message}
                  </p>
                )
              )}
              <div ref={messageEndRef} />
            </div>
          ) : (
            <h3
              className="my-2 mx-2 bg-dark"
              style={{ height: "calc(70vh - 56px)", overflowY: "scroll" }}
            >
              No hay mensajes
            </h3>
          )}
          <Form onSubmit={handleSubmit} className="row me-1">
            <Col xs={10}>
              <Form.Control
                autoFocus
                className="bg-dark text-white"
                as="textarea"
                placeholder="Escribe tu mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  // Si se preciona una tecla
                  if (e.key === "Enter" && !e.shiftKey) {
                    // Si la tecla presionada es Enter y no esta el shift apretado.
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </Col>
            <Col xs={2}>
              <Button type="submit">Enviar</Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BodyChat;
