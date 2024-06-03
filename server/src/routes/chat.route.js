import { Router } from "express";
import { newGroupChat, getMyChats } from "../controllers/chat.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

export { chatRouter };