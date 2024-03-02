import { Router } from "express";

const router = Router();

import { createTournament } from "../controllers/tournament.controller.js";

router.route("/createTournament").post(createTournament);

export default router;