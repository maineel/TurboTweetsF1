import { Router } from "express";
import { getChatPartners, getChat, createChat, updateChat, deleteChat } from "../controllers/chat.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.route("/chatPartners/:userId").get(verifyJWT, getChatPartners);
chatRouter.route("/getChat/:senderId/:receiverId").get(verifyJWT, getChat);
chatRouter.route("/createChat").post(verifyJWT, createChat);
chatRouter.route("/updateChat/:chatId").put(verifyJWT, updateChat);
chatRouter.route("/deleteChat/:chatId").delete(verifyJWT, deleteChat);

export { chatRouter };