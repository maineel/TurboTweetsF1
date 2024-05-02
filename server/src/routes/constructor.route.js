import { Router } from "express";
import { constructorDetails } from "../controllers/constructor.controller.js";

const constructorRouter = Router();
constructorRouter.route("/constructorDetails").get(constructorDetails);

export { constructorRouter };