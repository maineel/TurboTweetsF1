import { Router } from "express";
import { getRaceDetails, getRaceResults, driverDetails, constructorDetails, getDriverStandings } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/getRaceDetails").post(getRaceDetails);
adminRouter.route("/updateRaceData").post(getRaceResults);
adminRouter.route("/getDriverDetails").post(driverDetails);
adminRouter.route("/getConstructorDetails").post(constructorDetails);
adminRouter.route("/getDriverStandings").get(getDriverStandings);

export { adminRouter };
