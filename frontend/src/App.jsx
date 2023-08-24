import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ChatBoard from "./pages/chatboard";
import IndexPage from "./pages/IndexPage";
import io from "socket.io-client";
import makeToast from "./utils/toaster";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("token");
    if (token && !socket) {
      const newSocket = io("http://localhost:5000", {
        transports: ["websocket"],
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
        query: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        // makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        // makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };
  useEffect(() => {
    setupSocket();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} exact />
        <Route
          exact
          path="/dashboard"
          element={<ChatBoard socket={socket} />}
        />
        <Route exact path="/register" element={<SignUp />} />
        <Route
          exact
          path="/login"
          element={<Login setupSocket={setupSocket} />}
        />
      </Routes>
    </>
  );
}

export default App;
