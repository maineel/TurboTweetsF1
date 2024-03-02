import { Router } from "express";
import {driverDetails} from '../controllers/driver.controller.js'

const router = Router();

router.route("/addDriverDetails").post(driverDetails);

export default router;