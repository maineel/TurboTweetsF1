import { Router } from "express";
import { getRaceDetails, updateRaceData, driverDetails, constructorDetails } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/getRaceDetails").post(getRaceDetails);
adminRouter.route("/updateRaceData").put(updateRaceData);
adminRouter.route("/getdriverDetails").post(driverDetails);
adminRouter.route("/getconstructorDetails").post(constructorDetails);

export { adminRouter };
