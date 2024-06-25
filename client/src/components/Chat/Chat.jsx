import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Contactswindow from "./Contactswindow.jsx";
import Messagewindow from "./Messagewindow.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";

function Chat() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

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
    <>
      <div className="flex h-screen bg-[#2e2e2e]">
        <div className="w-1/4 border-r">
          <Contactswindow />
        </div>
        <div className="w-3/4">
          <Messagewindow />
        </div>
      </div>
    </>
  );
}

export default Chat;
