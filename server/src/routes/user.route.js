import { Router } from 'express';
import { registerUser, loginUser, logoutUser, refreshAccessToken, getUser, createTeam } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(verifyJWT,  logoutUser)
userRouter.route('/refresh').post(refreshAccessToken);
userRouter.route('/user').get(verifyJWT, getUser);
userRouter.route('/user/createTeam').post(createTeam);

export { userRouter };