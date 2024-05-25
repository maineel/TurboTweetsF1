import React from "react";
import { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

// const socket = io.connect("https://turbotweetsf1.onrender.com/api/v1/chat");
// const userName = nanoid(4);

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="text-3xl font-bold font-mono text-[#FF0000]"
      >
        <Link to="/auth/login" className="mx-2 underline underline-offset-2">
          LogIn
        </Link>{" "}
        <span> to view the chats</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row h-svh p-4">
      <div className="w-1/4 bg-white mx-4"></div>
      <div className="w-3/4 bg-white"></div>
    </div>
  );
}

export default Chat;
