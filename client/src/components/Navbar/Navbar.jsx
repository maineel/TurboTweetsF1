import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-black text-[#FF0000] h-auto flex justify-between px-4 py-4 md:px-4 items-center">
      <div className="text-2xl font-bold font-mono underline">
        <a href="#">TurboTweetsF1</a>
      </div>
      <div>
        <ul className="md:flex hidden font-bold text-xl">
          <li class="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">Threads</li>
          <li class="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">Inbox</li>
          <li class="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">F1 Stats</li>
          <li class="mx-16 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-4">Profile</li>
        </ul>
      </div>
      <div class="hidden md:block px-1 py-1 cursor-pointer bg-white text-[#FF0000] font-bold rounded hover:bg-[#FF0000] hover:text-black">
        Login | Signup
      </div>
      <div className="md:hidden">
        <a className="text-4xl" href="#" >{`\u2261`}</a>
      </div>
    </nav>
  );
}

export default Navbar;
