import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ChatBoard from "./pages/chatboard";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ChatBoard />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login/>} />

      </Routes>
    </>
  );
}

export default App;
