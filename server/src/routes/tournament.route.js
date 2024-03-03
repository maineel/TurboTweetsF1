import { Router } from "express";
import { createTournament, getTournaments, updateTournament } from "../controllers/tournament.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const tournamentRouter = Router();

tournamentRouter.route("/createTournament").post(createTournament);
tournamentRouter.route("/getTournaments").get(getTournaments);
tournamentRouter.route("/updateTournament").put(updateTournament);

export { tournamentRouter };