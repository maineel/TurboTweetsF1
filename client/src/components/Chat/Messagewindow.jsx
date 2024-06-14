import React, {useState} from "react";

function Messagewindow({ chat, sendMessage, messages, user }) {

  const [message, setMessage] = useState("");

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
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 p-2 rounded-lg max-w-xs ${
              msg.sender === user._id ? "bg-green-200 self-end" : "bg-gray-200 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <form className="bg-white h-auto rounded-md flex flex-row justify-between m-2 p-2">
        <input type="text" placeholder="Enter message" className="w-full p-2 mr-2" onChange={(e) => setMessage(e.target.value)}></input>
        <button className="bg-blue-600 p-2 rounded-md" onClick={() => sendMessage(message)}>Send</button>
      </form>
    </div>
  );
}

export default Messagewindow;
