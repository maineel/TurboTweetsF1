import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import { DB_NAME } from '../constants.js';
import  {asyncHandler}  from '../utils/asyncHandler.js';

// const url = process.env.URI;
// const client = new MongoClient(url);
// const dbName = DB_NAME;

// const driverDetails = asyncHandler(async(req,res) => {
//     await client.connect();
//     console.log('Connected successfully to MongoDB');

//     const db = client.db(dbName);
//     const collection = db.collection('drivers');

//     // Fetch data from the API and pick specific attributes
//     const apiData = await fetchApiData();
    
//     for(let i=0;i<22;i++){
//         const driver = apiData.MRData.DriverTable.Drivers[i];
//         const selectedAttributes = {
//             driverNumber: driver.permanentNumber,
//             driverName: driver.givenName + " " + driver.familyName,
//             driverNationality: driver.nationality,
//         };
//         const insertResult = await collection.insertOne(selectedAttributes);
//         console.log('Inserted document:', insertResult.insertedId);
//     }
//     // console.log(apiData.MRData.DriverTable.Drivers[3]);
//     // Insert the selected data into the MongoDB collection
// })

// async function fetchApiData() {
//     const response = await fetch('http://ergast.com/api/f1/2023/drivers.json');
//     if (!response.ok) {
//         throw new Error(`API fetch failed with status: ${response.status}`);
//     }
//     return response.json();
// }

export {  };

