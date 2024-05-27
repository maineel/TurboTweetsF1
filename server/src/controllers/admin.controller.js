import { Race } from "../models/race.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fetch from "node-fetch";
import { Constructor } from "../models/constructor.model.js";
import { Driver } from "../models/driver.model.js";

const driverDetails = asyncHandler(async (req, res) => {
  try {
    const data = await fetchDriverApiData();
    for (let i = 1; i <= data.MRData.DriverTable.Drivers.length; i++) {
      const driverDetail = await Driver.create({
        driverNumber: data.MRData.DriverTable.Drivers[i - 1].permanentNumber,
        driverName:data.MRData.DriverTable.Drivers[i - 1].givenName +" " +data.MRData.DriverTable.Drivers[i - 1].familyName,
        driverNationality: data.MRData.DriverTable.Drivers[i - 1].nationality,
        driverCode: data.MRData.DriverTable.Drivers[i - 1].code,
        driverDOB: data.MRData.DriverTable.Drivers[i - 1].dateOfBirth,
      });
      // console.log(driverDetail);
    }
    return res.status(200).json({ message: "Data fetched successfully" });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

async function fetchDriverApiData() {
  const response = await fetch("http://ergast.com/api/f1/2024/drivers.json");
  if (!response.ok) {
    throw new ApiError(500, `API fetch failed with status: ${response.status}`);
  }
  return response.json();
}

const constructorDetails = asyncHandler(async (req, res) => {
  try {
    const data = await fetchConstructorApiData();

    for (let i = 1; i <= 10; i++) {
      const constructorDetail = await Constructor.create({
        constructorName: data.MRData.ConstructorTable.Constructors[i - 1].name,
        constructorNationality:data.MRData.ConstructorTable.Constructors[i - 1].nationality,
      });
      console.log(constructorDetail);
    }
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

async function fetchConstructorApiData() {
  const response = await fetch(
    "http://ergast.com/api/f1/2023/constructors.json"
  );
  if (!response.ok) {
    throw new ApiError(500, `API fetch failed with status: ${response.status}`);
  }
  return response.json();
}

const fetchRaceApiData = async () => {
  const response = await fetch("http://ergast.com/api/f1/2023.json");
  if (!response.ok) {
    throw new ApiError(500, `API fetch failed with status: ${response.status}`);
  }
  return response.json();
};

const getRaceDetails = asyncHandler(async (req, res) => {
  try {
    const data = await fetchRaceApiData();

    for (let i = 1; i <= data.MRData.RaceTable.Races.length; i++) {
      const raceDetails = await Race.create({
        raceName: data.MRData.RaceTable.Races[i - 1].raceName,
        raceNumber: i,
        date: data.MRData.RaceTable.Races[i - 1].date,
      });
      console.log(raceDetails);
    }

    return res.status(200).json({ message: "Data fetched successfully" });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const fetchRaceResultsApiData = async (raceNumber) => {
  const response = await fetch(
    `http://ergast.com/api/f1/2023/${raceNumber}/results.json`
  );
  if (!response.ok) {
    throw new ApiError(500, `API fetch failed with status: ${response.status}`);
  }
  return response.json();
};

const getRaceResults = asyncHandler(async (req, res) => {
  const raceNumber = req.body.raceNumber;
  try {
    const race = await Race.findOne({ raceNumber: raceNumber });
    const data = await fetchRaceResultsApiData(raceNumber);
    const raceResults = data.MRData.RaceTable.Races[0].Results;
    for (let i = 1; i <= raceResults.length; i++) {
      const driverId = await Driver.findOne({driverName:raceResults[i - 1].Driver.givenName +" " +raceResults[i - 1].Driver.familyName});
      const constructorId = await Constructor.findOne({
        constructorName: raceResults[i - 1].Constructor.name,
      });
      // console.log(driverId._id, constructorId._id);
      const points = raceResults[i - 1].points;
      race.raceResults.push({
        driverId: driverId._id,
        constructorId: constructorId._id,
        points: points,
        position: i,
      });
      // console.log(race.raceResults[i]);
    }
    await race.save();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Race Results Updated Successfully",
          race.raceResults
        )
      );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const fetchDriverStandings = async () => {
  const response = await fetch(
    "http://ergast.com/api/f1/current/driverStandings.json"
  );
  if (!response.ok) {
    throw new ApiError(500, `API fetch failed with status: ${response.status}`);
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};

const fetchConstructorStandings = async () => {
  const response = await fetch(
    "http://ergast.com/api/f1/current/constructorStandings.json"
  );
  if (!response.ok) {
    throw new ApiError(500, `API fetch failed with status: ${response.status}`);
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};

const updateDriverAndConstructorStandings = async (req,res) => {
  const data = await fetchDriverStandings();
  const constructorData = await fetchConstructorStandings();

  const driverPoints = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  const constructorPoints = constructorData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

  for (let i = 1; i <= driverPoints.length; i++) {
    const code = driverPoints[i - 1].Driver.code;
    const constructor = driverPoints[i - 1].Constructors[0].name;
    const points = driverPoints[i - 1].points;
    const position = driverPoints[i - 1].position;

    await Driver.updateOne(
      { driverCode: code },
      {
        $set: {
          position: position,
          driverTeam: constructor,
          totalPoints: points,
        },
      }
    );
  }

  for (let i = 1; i <= constructorPoints.length; i++) {
    const points = constructorPoints[i - 1].points;
    const name = constructorPoints[i - 1].Constructor.name;
    await Constructor.updateOne(
      { constructorName: name},
      { 
          $set: { 
              totalPoints: points 
          } 
      }
    );
  }

  return res.status(200).json({ message: "Data updated successfully" });
};

export {
  getRaceDetails,
  getRaceResults,
  driverDetails,
  constructorDetails,
  updateDriverAndConstructorStandings,
};
