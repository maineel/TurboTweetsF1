import React from 'react';

function Contactswindow ({ chats, selectChat }) {
  
  const handleChatSelection = (chatName) => {
    selectChat(chatName);
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {chats.map(chat => (
        <div
          key={chat._id}
          className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-200"
          onClick={() => handleChatSelection(chat.name)}
        >
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{chat.name}</h3>
            {/* <p className="text-gray-600">{chat.messages[messages.length-1]}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contactswindow;
