import { Router } from 'express';
import { registerUser, loginUser, logoutUser, refreshAccessToken, getUser, createTeam, uploadAvatar, getAvatar } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(logoutUser)
userRouter.route('/refresh').post(refreshAccessToken);
userRouter.route('/user').get(verifyJWT, getUser);
userRouter.route('/uploadAvatar').post(upload.single("avatar"), uploadAvatar);
userRouter.route('/getAvatar').post(getAvatar);
userRouter.route('/createTeam').post(createTeam);

export { userRouter };