import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ChatContext } from "../../context/ChatContext";

function Messagewindow() {
  const [message, setMessage] = useState("");

  const {
    searchChat,
    setSearchChat,
    allChats,
    setAllChats,
    selectedChat,
    setSelectedChat,
    allMessagesFromChat,
    setAllMessagesFromChat,
    sendMessage,
    setSendMessage,
    chat,
    setChat,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const newSendMessage = async (message) => {
      // socket.emit("message", message);
      console.log(chat.members.filter((member) => member !== user._id)[0]);
      const updatedChat = await axios.post(
        "http://localhost:8000/api/v1/chat/addMessageToChat",
        {
          userId: user._id,
          chatId: chat._id,
          content: message,
          reciever: [chat.members.filter((member) => member !== user._id)[0]],
        }
      );
      if (updatedChat.data.success) {
        setAllMessagesFromChat((prevMessages) => [...prevMessages, message]);
        setMessage("");
      }
    };
    setSendMessage(() => newSendMessage);
  }, [allMessagesFromChat, user, chat]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center p-4 border-b">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold text-[#ff0000]">{chat.name}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bottom-0">
        {allMessagesFromChat.map((msg, idx) => (
          <div
            key={idx}
            className="mb-4 p-2 rounded-lg max-w-xs bg-gray-200 self-start"
          >
            {msg}
          </div>
        ))}
      </div>
      <div className="bg-white h-auto rounded-md flex flex-row justify-between m-2 p-2">
        <input
          type="text"
          placeholder="Enter message"
          className="w-full p-2 mr-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(message);
              setMessage("");
            }
          }}
        ></input>
        <button
          type="button"
          className="bg-blue-600 p-2 rounded-md"
          onClick={() => {
            sendMessage(message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Messagewindow;
