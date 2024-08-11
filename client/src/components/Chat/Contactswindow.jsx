import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import axios, { all } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../../context/SocketContext";
import { FaTrashCan } from "react-icons/fa6";
import { MdOutlineGroupAdd } from "react-icons/md";

function Contactswindow() {
  const [hoveredChat, setHoveredChat] = useState(null);
  const [groupCreation, setGroupCreation] = useState(false);
  const [userToAdd, setUserToAdd] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const handleChatDeletion = async (chat) => {
    await axios.delete(
      `https://turbotweetsf1.onrender.com/api/v1/chat/deleteChat/${chat._id}`
    );
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

  const handleCurrentUserToAdd = async (username) => {
    const fetchedUser = await axios.get(
      `https://turbotweetsf1.onrender.com/api/v1/chat/getUserByUsername/${username}`
    );
    if (fetchedUser.data.data) {
      console.log(fetchedUser.data.data);
      setGroupUsers([...groupUsers, fetchedUser.data.data]);
    }
    setUserToAdd("");
  };

  const handleGroupCreation = async (e) => {
    const newGroupChat = await axios.post("https://turbotweetsf1.onrender.com/api/v1/chat/newGroupChat",{
      name: groupName,
      members: groupUsers,
      user: user,
    })
    e.preventDefault();
    console.log(newGroupChat);  
    setAllChats([...allChats, newGroupChat.data.data]);
    setGroupCreation(false);
    setGroupUsers([]);
  };

  return (
    <>
      <div className="flex flex-row w-full items-center border-b">
        {groupCreation && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <form
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col">
                  <input
                    className="w-full px-3 py-2 mt-2 mx-1 text-gray-700 border-4 rounded-lg"
                    type="text"
                    name="groupName"
                    placeholder="Group Name"
                    onChange={(e) => {
                      setGroupName(e.target.value);
                    }}
                    value={groupName}
                  />
                  <div className="bg-white flex flex-row justify-between items-center w-full">
                    <input
                      className=" w-full px-3 py-2 mt-2 ml-1 mr-4 text-gray-700 border-4 rounded-lg"
                      type="text"
                      name="userName"
                      placeholder="User Name"
                      onChange={(e) => {
                        setUserToAdd(e.target.value);
                      }}
                      value={userToAdd}
                    />
                    <MdOutlineGroupAdd
                      className="text-3xl"
                      onClick={() => handleCurrentUserToAdd(userToAdd)}
                      aria-label="Add to group"
                    />
                  </div>
                  {groupUsers.map((user, idx) => {
                    return (
                      <div className="m-2 flex flex-row items-center">
                        <img
                          key={idx}
                          src={user.avatar}
                          alt={user.userName}
                          className="w-12 h-12 rounded-full mx-4"
                        />
                        <p className="font-bold">{user.userName}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => handleGroupCreation(e)}
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setGroupCreation(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <form
          className="flex items-center p-3 w-4/5 border-r"
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
        <MdOutlineGroupAdd
          className="text-4xl mr-1 w-1/5"
          onClick={() => setGroupCreation(true)}
        />
      </div>
      {allChats.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          No contacts found
        </div>
      ) : (
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
      )}
      <ToastContainer />
    </>
  );
}

export default Contactswindow;
