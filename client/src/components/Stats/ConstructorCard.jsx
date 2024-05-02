import React from "react";

function ConstructorCard({ constructors }) {
  return (
    <div
      style={{ borderColor: constructors.color || "#FF0000" }}
      className="w-[40%] bg-[#2e2e2e] rounded-md m-2 text-white justify-between flex flex-row border-b-4"
    >
      <div className="flex flex-col">
        <h1 className="font-mono ml-2 text-2xl">
          <b><u>{constructors.constructorName}</u></b> | {constructors.constructorNationality}
        </h1>
        <h2 className="font-mono italic m-2 text-xl font-bold" style={{ color: constructors.color || "#FF0000" }}>Total Points: {constructors.totalPoints}</h2>
      </div>
      <div>
        <img
          src={constructors.teamLogo}
          style={{ width: "100%", height: "100px" }}
        />
      </div>
    </div>
  );
}

export default ConstructorCard;
