import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import CallPage from "./pages/CallPage.jsx";
import IncomingCallModal from "./components/Calls/IncomingCallModal.jsx";
import { useAuthContext } from "./Context/AuthContext.jsx";
import { useSocketContext } from "./Context/SocketContext";
import { io } from "socket.io-client";

// 🔑 replace URL if different



function App() {
  // const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();


  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/Login" />}
        />
        <Route path="/call/:calleeId" element={<CallPage />} />
        <Route
          path="/SignUp"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/Login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>

      <Toaster />

     
    </div>
  );
}

export default App;
