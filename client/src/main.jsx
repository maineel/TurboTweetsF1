import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Stats from './components/Stats/Stats.jsx';
import Threads from "./components/Threads/Threads";
import Profile from './components/Profile/Profile.jsx';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Layout from './Layout.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        path: "profile/:profileid",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
