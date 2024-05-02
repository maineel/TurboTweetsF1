import React, { useState, useEffect } from "react";
import DriverCard from "./DriverCard";
import ConstructorCard from "./ConstructorCard";

function Stats() {
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/api/v1/driver/driverDetails";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setDrivers(result);
        // console.log(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/api/v1/constructor/constructorDetails";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setConstructors(result);
        // console.log(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className="text-3xl font-bold font-mono text-red-500"
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-auto bg-black">
      <div className="text-2xl text-[#ff0000] font-mono font-semibold text-center my-2 underline underline-offset-8">
        Driver Standings
      </div>
      <div className="w-full flex flex-wrap justify-evenly">
        {drivers
          .sort((a, b) => a.position - b.position)
          .map((driver, i) => (
            <DriverCard key={i} drivers={driver} />
          ))}
      </div>
      <div className="text-2xl mt-16 text-[#ff0000] font-mono font-semibold text-center my-2 underline underline-offset-8">
        Constructor Standings
      </div>
      <div className="w-full flex flex-wrap justify-evenly">
        {constructors
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .map((constructor, i) => (
            <ConstructorCard key={i} constructors={constructor} />
          ))}
      </div>
    </div>
  );
}

export default Stats;
