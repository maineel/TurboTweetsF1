import { Router } from "express";
import { driverDetails } from "../controllers/driver.controller.js";

const driverRouter = Router();
driverRouter.route("/driverDetails").get(driverDetails);

export { driverRouter };