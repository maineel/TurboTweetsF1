import React from "react";

function DriverCard({ drivers }) {
  return (
    <div
      style={{ borderColor: drivers.color || "#FF0000" }}
      className="w-[30%] bg-[#2e2e2e] rounded-md m-2 text-white justify-between flex flex-row border-b-4"
    >
      <div className="flex flex-col">
        <h1 className="font-mono ml-2 text-xl">
          <b><u>{drivers.driverName}</u></b> | {drivers.driverNumber} |{" "}
          {drivers.driverNationality}
        </h1>
        <h2 className="font-mono italic ml-2 text-xl">{drivers.driverCode}</h2>
        <div className="flex flex-row">
          <h2
            className="font-bold italic ml-2 text-xl"
            style={{ color: drivers.color || "#FF0000" }}
          >
            {drivers.driverTeam} |{" "}
          </h2>
          <h2
            className="font-bold italic ml-2 text-xl"
            style={{ color: drivers.color || "#FF0000" }}
          >
            Points: {drivers.totalPoints} | Position: {drivers.position}
          </h2>
        </div>
      </div>
      <div>
        <img
          src={drivers.driverImg}
          style={{ width: "100%", height: "100px" }}
        />
      </div>
    </div>
  );
}

export default DriverCard;
