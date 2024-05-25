import React, { useState, useEffect, useContext } from "react";
import DriverCard from "./DriverCard";
import ConstructorCard from "./ConstructorCard";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Stats() {
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const driverUrl =
        "https://turbotweetsf1.onrender.com/api/v1/driver/driverDetails";
      const constructorUrl =
        "https://turbotweetsf1.onrender.com/api/v1/constructor/constructorDetails";
      try {
        const driverResponse = await fetch(driverUrl);
        const constructorResponse = await fetch(constructorUrl);
        if (!driverResponse.ok || !constructorResponse.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const driverResult = await driverResponse.json();
        const constructorResult = await constructorResponse.json();

        setDrivers(driverResult);
        setConstructors(constructorResult);

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
      <Link to="/auth/login" className="mx-2 underline underline-offset-2">LogIn</Link> <span> to view the stats</span>
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
