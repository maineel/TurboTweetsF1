import { Router } from "express";
import { getRaceDetails, getRaceResults, driverDetails, constructorDetails, getDriverStandings } from "../controllers/admin.controller.js";
import nodecron from 'node-cron';

const adminRouter = Router();

nodecron.schedule(
    "12 50 * * TUE", async () => {
        try{
            await getDriverStandings();
            console.log("Driver Standings Updated");
        } catch (error) {
            console.log(error);
        }
    }
)

adminRouter.route("/getRaceDetails").post(getRaceDetails);
adminRouter.route("/updateRaceData").post(getRaceResults);
adminRouter.route("/getDriverDetails").post(driverDetails);
adminRouter.route("/getConstructorDetails").post(constructorDetails);
adminRouter.route("/getDriverStandings").get(getDriverStandings);

export { adminRouter };
