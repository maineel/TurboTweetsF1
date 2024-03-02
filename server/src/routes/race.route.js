import { Router } from "express";


const raceRouter = Router();

raceRouter.route('/').get();

export { raceRouter };
