import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [searchChat, setSearchChat] = useState(null);
    const [allChats, setAllChats] = useState([{}]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [allMessagesFromChat, setAllMessagesFromChat] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [chat, setChat] = useState(null);
    const [chatUserName, setChatUserName] = useState(null);
    return (
        <ChatContext.Provider value={{ 
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
            chatUserName,
            setChatUserName
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}   