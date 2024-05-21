import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const socket = io.connect("https://turbotweetsf1.onrender.com");
const userName = nanoid(4);

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
    <div>
      {chat.map((payload, index) => {
        return (
            <p key={index} className="text-[#ff0000]">{payload.message}: <span>id: {payload.userName}</span></p>
        )
      })}
      <form className="font-xl text-[#FF0000] items-center w-full" onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="m-auto"
        ></input>
        <button type="submit" className="bg-red-500 text-white mx-2 p-1">Send</button>
      </form>
    </div>
  );
}

export default Chat;
