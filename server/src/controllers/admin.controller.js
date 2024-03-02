import { Race } from "../models/race.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import fetch from 'node-fetch';
import { Constructor } from "../models/constructor.model.js";
import { Driver } from "../models/driver.model.js";

const driverDetails = asyncHandler(async(req,res) => {
    
    const data = await fetchDriverApiData();
    
    for(let i=1;i<=22;i++){
        const driverDetail = await Driver.create({
            driverNumber: data.MRData.DriverTable.Drivers[i-1].permanentNumber,
            driverName: data.MRData.DriverTable.Drivers[i-1].givenName + " " + data.MRData.DriverTable.Drivers[i-1].familyName,
            driverNationality: data.MRData.DriverTable.Drivers[i-1].national
        });
        console.log(driverDetail);
    }
    
})

async function fetchDriverApiData() {
    const response = await fetch('http://ergast.com/api/f1/2023/drivers.json');
    if (!response.ok) {
        throw new ApiError(500, `API fetch failed with status: ${response.status}`);
    }
    return response.json();
}

const constructorDetails = asyncHandler(async(req,res) => {
    try {
        const data = await fetchConstructorApiData();
    
        for(let i = 1; i <= 10; i++){
            const constructorDetail = await Constructor.create({
                constructorName: data.MRData.ConstructorTable.Constructors[i-1].name,
                constructorNationality: data.MRData.ConstructorTable.Constructors[i-1].nationality
            });
            console.log(constructorDetail);
        }
    } catch (error) {
        throw new ApiError(400, error.message);
    }
})

async function fetchConstructorApiData() {
    const response = await fetch('http://ergast.com/api/f1/2023/constructors.json');
    if (!response.ok) {
        throw new ApiError(500, `API fetch failed with status: ${response.status}`);
    }
    return response.json();
}

const fetchRaceApiData = async () => {
    const response = await fetch('http://ergast.com/api/f1/2024.json');
    if (!response.ok) {
        throw new ApiError(500, `API fetch failed with status: ${response.status}`);
    }
    return response.json();
}
const getRaceDetails = asyncHandler(async (req, res) => {
    try {
        const data = await fetchRaceApiData();
    
        for(let i = 1; i <= 24; i++){
            const raceDetails = await Race.create({
                raceName: data.MRData.RaceTable.Races[i-1].raceName,
                raceNumber: i,
                date: data.MRData.RaceTable.Races[i-1].date,
                time: data.MRData.RaceTable.Races[i-1].time,
            });
            console.log(raceDetails);
        }
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

const updateRaceData = asyncHandler(async (req, res) => {
    
});


export { getRaceDetails, updateRaceData, driverDetails, constructorDetails }