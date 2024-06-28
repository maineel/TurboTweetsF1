import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ChatContext } from "../../context/ChatContext";
import { SocketContext } from "../../context/SocketContext";

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

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const newSendMessage = async (message) => {
      if (message) {
        const updatedChat = await axios.post(
          "http://localhost:8000/api/v1/chat/addMessageToChat",
          {
            userId: user._id,
            chatId: chat._id,
            content: message,
            reciever: [chat.members.filter((member) => member !== user._id)[0]],
          }
        );
        setMessage("");
      }
    };
    setSendMessage(() => newSendMessage);
  }, [allMessagesFromChat, user, chat]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        setAllMessagesFromChat((prevMessages) => [...prevMessages, newMessage]);
      });
      return () => socket.off("newMessage");
    }
  }, [socket, setAllMessagesFromChat, allMessagesFromChat]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <h2 className="text-xl font-semibold text-[#ff0000]">{chat.name}</h2>
      </div>
      <div className="flex flex-col grow p-4 overflow-y-auto">
        {allMessagesFromChat.map((msg, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`mb-2 p-2 rounded-lg max-w-xl break-words font-mono font-semibold text-white ${
                msg.sender === user._id
                  ? "bg-blue-600 self-end"
                  : "bg-gray-500 self-start"
              }`}
            >
              {msg.content}
              <p className="text-sm font-light mt-2 italic text-black opacity-75">
                {new Date(msg.updatedAt).toLocaleString()}
              </p>
            </div>
          </React.Fragment>
        ))}
        
      </div>
      <div className="bg-white h-auto rounded-md flex flex-row justify-between m-2 p-2">
        <input
          type="text"
          placeholder="Enter message"
          className="w-full p-2 mr-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
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
