import React, { useMemo } from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Contactswindow from "./Contactswindow.jsx";
import Messagewindow from "./Messagewindow.jsx";
import axios from "axios";

function Chat() {
  const socket = useMemo(
    () =>
      io.connect("localhost:8001", {
        withCredentials: true,
      }),
    []
  );

  const [chats, setChats] = useState([{}]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/chat/getMyChats/${user._id}`
      );
      setChats(response.data.data);
    };

    fetchChats();
  },[]);

  useEffect(() => {
    socket.on("message", (message) => {
      return () => {
        socket.off("message");
      };
    });
  }, [socket]);

  const sendMessage = async (message) => {
    socket.emit("message", message);
    const fetchedChat = await axios.post(
      "http://localhost:8000/api/v1/chat/personalChat",
      {
        recipient: selectedChat,
      }
    );

    const updatedChat = await axios.post(
      "http://localhost:8000/api/v1/chat/addMessageToChat",
      {
        chatId: fetchedChat.data._id,
        content: message,
      }
    )

    setMessages(updatedChat.data.messages);
  };

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
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <Contactswindow 
          chats={chats} 
          selectChat={setSelectedChat} 
        />
      </div>
      <div className="w-3/4">
        <Messagewindow
          chat={chat}
          sendMessage={sendMessage}
          messages={messages}
          user={user}
        />
      </div>
    </div>
  );
}

export default Chat;
