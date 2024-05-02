import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Threads from "./components/Threads/Threads";
import Stats from "./components/Stats/Stats";

function App() {
  return (
    <>
      <Navbar />  
      <Stats />
      <Threads />
    </>
  );
}

export default App;