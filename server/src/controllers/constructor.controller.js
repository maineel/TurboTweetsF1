import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import { DB_NAME } from '../constants.js';
import  {asyncHandler}  from '../utils/asyncHandler.js';

const url = process.env.URI;
const client = new MongoClient(url);
const dbName = DB_NAME;

const constructorDetails = asyncHandler(async(req,res) => {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('constructors');

    // Fetch data from the API and pick specific attributes
    const apiData = await fetchApiData();
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

async function fetchApiData() {
    const response = await fetch('http://ergast.com/api/f1/2023/constructors.json');
    if (!response.ok) {
        throw new Error(`API fetch failed with status: ${response.status}`);
    }
    return response.json();
}



export {  };


