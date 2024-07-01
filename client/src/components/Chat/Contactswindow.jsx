import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../../context/SocketContext";
import { FaTrashCan } from "react-icons/fa6";

function Contactswindow() {
  const [hoveredChat, setHoveredChat] = useState(null);

  const handleChatDeletion = async (chat) => {
    await axios.delete(`https://turbotweetsf1.onrender.com/api/v1/chat/deleteChat/${chat._id}`);
    toast.success("Chat deleted successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setChat(null);
    setAllChats(allChats.filter((c) => c._id !== chat._id));
  };

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

  const { onlineUsers } = useContext(SocketContext);
  const isOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  const handleChatSelection = (chatName) => {
    setSelectedChat(chatName);
  };

  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.get(
        `https://turbotweetsf1.onrender.com/api/v1/chat/getMyChats/${user._id}`
      );
      for (const recievedChat of response.data.data) {
        if (!recievedChat.groupChat && recievedChat.sender !== user._id) {
          recievedChat.name = recievedChat.senderName;
          recievedChat.avatar = recievedChat.senderAvatar;
        }
      }
      setAllChats(response.data.data);
    };
    fetchChats();
  }, [chat, allMessagesFromChat]);

  const fetchChatAndDefineSendMessage = async (chat) => {
    if (chat) {
      const fetchedChat = await axios.post(
        "https://turbotweetsf1.onrender.com/api/v1/chat/personalChat",
        {
          recipient: chat,
          user: user,
        }
      );
      if (fetchedChat?.status === 201) {
        if (
          !fetchedChat.data.data.groupChat &&
          fetchedChat.data.data.sender !== user._id
        ) {
          fetchedChat.data.data.name = fetchedChat.data.data.senderName;
          fetchedChat.data.data.avatar = fetchedChat.data.data.senderAvatar;
        }
        setChat(fetchedChat.data.data);
      } else if (fetchedChat?.status === 200) {
        if (
          !fetchedChat.data.message.groupChat &&
          fetchedChat.data.message.sender !== user._id
        ) {
          fetchedChat.data.message.name = fetchedChat.data.message.senderName;
          fetchedChat.data.message.avatar =
            fetchedChat.data.message.senderAvatar;
        }
        setChat(fetchedChat.data.message);
      }
      const ChatId = fetchedChat.data.message._id || fetchedChat.data.data._id;
      const fetchedMessages = await axios.get(
        `https://turbotweetsf1.onrender.com/api/v1/message/getMessagesFromId/${ChatId}`
      );
      const chatMessages = [];
      for (let i = 0; i < fetchedMessages.data.data.length; i++) {
        chatMessages.push({
          content: fetchedMessages.data.data[i].content,
          sender: fetchedMessages.data.data[i].sender,
          updatedAt: fetchedMessages.data.data[i].updatedAt,
        });
      }
      setAllMessagesFromChat(chatMessages);
      setSelectedChat(chat);
      setSearchChat("");
    }
  };

  useEffect(() => {
    fetchChatAndDefineSendMessage(selectedChat);
  }, [selectedChat]);

  const extractChatMember = (chat) => {
    if (user._id === chat.members?.[0]) {
      return chat.members?.[1];
    }
    return chat.members?.[0];
  };

  return (
    <>
      <form
        className="p-3 border-b"
        onSubmit={(e) => {
          e.preventDefault();
          fetchChatAndDefineSendMessage(searchChat);
        }}
      >
        <input
          type="text"
          placeholder="Search Chats"
          className="p-2 w-4/5"
          onChange={(e) => {
            setSearchChat(e.target.value);
          }}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">
          Search
        </button>
      </form>
      <div className="flex flex-col w-full h-full overflow-y-auto">
        {allChats.map((chat, idx) => (
          <div
            key={idx}
            className={`flex flex-row items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-500 ${
              selectedChat === chat.name ? "bg-gray-200" : ""
            }`}
            onMouseEnter={() => setHoveredChat(chat.name)}
            onMouseLeave={() => setHoveredChat(null)}
            onClick={() => handleChatSelection(chat.name)}
          >
            <div className="flex flex-row items-center">
              <img
                src={chat.avatar}
                alt={chat.name}
                className={`w-12 h-12 rounded-full mr-4 ${
                  !chat.groupChat && isOnline(extractChatMember(chat))
                    ? "border-4 border-green-500"
                    : ""
                }`}
              />
              <div>
                <h3 className="text-lg font-semibold">{chat.name}</h3>
              </div>
            </div>
            {hoveredChat === chat.name && (
              <FaTrashCan
                onClick={(event) => {
                  event.stopPropagation();
                  handleChatDeletion(chat);
                }}
              />
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}

export default Contactswindow;
