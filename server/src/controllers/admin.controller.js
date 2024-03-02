import { Race } from "../models/race.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';
import { DB_NAME } from '../constants.js';


const url = process.env.URI;
const client = new MongoClient(url);
const dbName = DB_NAME;

const driverDetails = asyncHandler(async(req,res) => {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('drivers');

    // Fetch data from the API and pick specific attributes
    const apiData = await fetchDriverApiData();
    
    for(let i=0;i<22;i++){
        const driver = apiData.MRData.DriverTable.Drivers[i];
        const selectedAttributes = {
            driverNumber: driver.permanentNumber,
            driverName: driver.givenName + " " + driver.familyName,
            driverNationality: driver.nationality,
        };
        const insertResult = await collection.insertOne(selectedAttributes);
        console.log('Inserted document:', insertResult.insertedId);
    }
    // console.log(apiData.MRData.DriverTable.Drivers[3]);
    // Insert the selected data into the MongoDB collection
})

async function fetchDriverApiData() {
    const response = await fetch('http://ergast.com/api/f1/2023/drivers.json');
    if (!response.ok) {
        throw new Error(`API fetch failed with status: ${response.status}`);
    }
    return response.json();
}

const constructorDetails = asyncHandler(async(req,res) => {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('constructors');

    // Fetch data from the API and pick specific attributes
    const apiData = await fetchConstructorApiData();
    // console.log(apiData);
    
    // console.log(apiData.MRData.ConstructorTable.Constructors[3]);
    for(let i=0;i<10;i++){
        const constructor = apiData.MRData.ConstructorTable.Constructors[i];
        const selectedAttributes = {
            constructorName: constructor.name,
            constructorNationality: constructor.nationality,
        };
        const insertResult = await collection.insertOne(selectedAttributes);
        console.log('Inserted document:', insertResult.insertedId);
    }
})

async function fetchConstructorApiData() {
    const response = await fetch('http://ergast.com/api/f1/2023/constructors.json');
    if (!response.ok) {
        throw new Error(`API fetch failed with status: ${response.status}`);
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