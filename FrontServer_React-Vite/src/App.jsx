import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import { AuthUserProvider } from "./contexts/AuthUserContext";
import { UsersProvider } from "./contexts/UsersContext";
import { MessagesProvider } from "./contexts/MessagesContext";

import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";

import { ChatPage } from "./pages/ChatPage";
import { RecoveryPasswordPage } from "./pages/RecoveryPasswordPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { UsersAddPage } from "./pages/UsersAddPage";
import { UsersEditPage } from "./pages/UsersEditPage";
import { ErrorPage } from "./pages/ErrorPage";
import { FatalErrorPage } from "./pages/FatalErrorPage";
import { Test } from "./pages/Test";



function App() {
  return (
    <>
      <AuthUserProvider>
        <UsersProvider>
          <MessagesProvider>
            <BrowserRouter> {/* Configuramos las rutas */}
              <Routes> {/* Indicamos que vas a ser multiples rutas */}

                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/recoveryPassword" element={<RecoveryPasswordPage />}></Route>

                <Route element={<ProtectedRoute rol="user" />}>
                  <Route path="/profile" element={<ProfilePage />}></Route>
                  <Route path="/chat" element={<ChatPage />}></Route>
                </Route>
                
                <Route element={<ProtectedRoute rol="superAdmin" />}>
                  <Route path="/users" element={<UsersPage />}></Route>
                  <Route path="/usersAdd" element={<UsersAddPage />}></Route>
                  <Route path="/users/:id" element={<UsersEditPage />}></Route>
                </Route>

                <Route path="/errorPage" element={<ErrorPage />}></Route>
                <Route path="/fatalErrorPage" element={<FatalErrorPage />}></Route>
                <Route path="/test" element={<Test />}></Route>
                <Route path="*" element={<ErrorPage />}></Route> </Routes>
            </BrowserRouter>
          </MessagesProvider>
        </UsersProvider>
      </AuthUserProvider>
    </>
  );
}

export default App;
