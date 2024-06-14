import { Router } from "express";
import { uploadChatAvatar, newGroupChat, addMembers, personalChat, getMyChats, searchChat, addMessageToChat } from "../controllers/chat.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';

const chatRouter = Router();

chatRouter.route("/uploadAvatar").post(upload.single("avatar"), uploadChatAvatar);
chatRouter.route("/newGroupChat").post(newGroupChat);
chatRouter.route("/addMembers").post(addMembers);
chatRouter.route("/personalChat").post(personalChat);
chatRouter.route("/getMyChats/:user").get(getMyChats);
chatRouter.route("/searchChat").get(searchChat);
chatRouter.route("/addMessageToChat").post(addMessageToChat);

export { chatRouter };