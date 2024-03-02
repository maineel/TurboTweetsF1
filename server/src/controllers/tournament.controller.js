import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"
import { Tournament } from '../models/tournament.model.js';

const createTournament = asyncHandler(async (req, res, next) => {
    const { tournamentName, initialBet, raceId } = req.body;
    const creatorId = req.user._id;

    if(!tournamentName || !initialBet || !raceId) {
        throw new ApiError(400, "Please provide all the details");
    }

    if(!creatorId) {
        throw new ApiError(400, "Please login to create a tournament");
    }

    const tournament = await Tournament.create({ tournamentName, creatorId, initialBet, raceId });

    if(!tournament) {
        throw new ApiError(500, "Internal Server Error");
    }

    console.log(tournament);

    return res
    .status(200)
    .json(new ApiResponse(200, "Tournament created successfully", tournament));
});

const getTournament = asyncHandler(async (req, res, next) => {
    const raceId = req.params.raceId;

    if(!raceId) {
        throw new ApiError(400, "Please provide raceId");
    }

    const tournament = await Tournament.findOne({ raceId });

    if(!tournament) {
        throw new ApiError(404, "No tournament found for the given");
    }

    console.log(tournament);

    return res
    .status(200)
    .json(new ApiResponse(200, "Tournaments found successfully", tournament));

});


export { createTournament, getTournament };