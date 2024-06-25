import { Router } from "express";
import { uploadAttachement, newMessage, editMessage, searchMessage, getMessagesFromId, getMessagesFromMessageId } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';

const messageRouter = Router();

messageRouter.route("/uploadAttachement").post(upload.single("attachement"), uploadAttachement);
messageRouter.route("/newMessage").post(verifyJWT, newMessage);
messageRouter.route("/editMessage").put(verifyJWT, editMessage);
messageRouter.route("/searchMessage").get(verifyJWT, searchMessage);
messageRouter.route("/getMessagesFromId/:chatId").get(getMessagesFromId);
messageRouter.route("/getMessagesFromMessageId").post(getMessagesFromMessageId)

export { messageRouter };