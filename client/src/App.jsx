import React from "react";
import Layout from "./Layout";
import Stats from './components/Stats/Stats.jsx';
import Threads from "./components/Threads/Threads";
import Profile from './components/Profile/Profile.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Chat from './components/Chat/Chat.jsx';
import { ChatProvider } from "./context/ChatContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Threads />,
      },
      {
        path: "threads",
        element: <Threads />,
      },
      {
        path: "f1stats",
        element: <Stats />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "inbox",
        element: <ChatProvider><Chat /></ChatProvider>,
      }
    ],
  },
  {
    path:"/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
    ],
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;