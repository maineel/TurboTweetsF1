import { Router } from "express";
import { getRaceDetails, getRaceResults, driverDetails, constructorDetails, updateDriverAndConstructorStandings } from "../controllers/admin.controller.js";
import nodecron from 'node-cron';

const adminRouter = Router();

nodecron.schedule(
    "* * 12 * * MON", async () => {
        try{
            await updateDriverAndConstructorStandings();
        } catch (error) {
            console.log(error);
        }
    },
    {
        scheduled: true,
        timezone: "Asia/Kolkata",
    }
)

adminRouter.route("/getRaceDetails").post(getRaceDetails);
adminRouter.route("/updateRaceData").post(getRaceResults);
adminRouter.route("/getDriverDetails").post(driverDetails);
adminRouter.route("/getConstructorDetails").post(constructorDetails);

export { adminRouter };
