import { Tournament } from '../models/tournament.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createTournament = asyncHandler(async(req,res) => {});

const getTournaments = asyncHandler(async(req,res) => {});

const updateTournament = asyncHandler(async(req,res) => {});

export { createTournament, getTournaments, updateTournament };