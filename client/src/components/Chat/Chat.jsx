import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// const socket = io.connect("https://turbotweetsf1.onrender.com/api/v1/chat");
// const userName = nanoid(4);

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
    
    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", {message, userName})
        setMessage("");
    };

    useEffect(() => {
        socket.on("chat", (payload) => {
            setChat([...chat, payload]);
        });
    });

  return (
    <div className="w-full flex flex-row h-svh p-4">
      <div className="w-1/4 bg-white mx-4"></div>
      <div className="w-3/4 bg-white"></div>
    </div>
  );
}

export default Chat;
