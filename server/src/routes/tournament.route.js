import { asyncHandler } from '../middleware/async.js';
import { Tournament } from '../models/tournament.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const createTournament = asyncHandler(async (req, res) => {});

const getTournaments = asyncHandler(async (req, res) => {});

export { createTournament, getTournaments };