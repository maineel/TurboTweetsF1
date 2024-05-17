import React from "react";
import { Link, NavLink } from "react-router-dom";
import threads from "../Threads/Threads";

function Navbar() {
  return (
    <nav className="w-full bg-black text-[#FF0000] h-auto flex justify-between px-4 py-4 md:px-4 items-center">
      <div className="text-2xl font-bold font-mono underline">
        <NavLink to="/">TurboTweetsF1</NavLink>
      </div>
      <div>
        <ul className="md:flex hidden font-bold text-xl">
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/threads">Threads</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/inbox">Inbox</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/f1stats">F1 Stats</NavLink>
          </li>
          <li className="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">
            <NavLink to="/profile/profileid">Profile</NavLink>
          </li>
        </ul>
      </div>
      <div className="hidden md:block px-2 py-1 cursor-pointer bg-[#FF0000] text-black font-bold rounded hover:bg-[#FF0000] hover:text-white">
        <NavLink to="/login">Login</NavLink>
      </div>
      <div className="md:hidden">
        <NavLink className="text-4xl" to="/" >{`\u2261`}</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;