import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app } from './socket/socket.js';

app.use(cors({origin: ["http://localhost:5173", "https://turbotweetsf1.netlify.app"], credentials: true}));
app.use(express.json({limit: "16kb"})); // to limit the size of data which express should accept
app.use(express.urlencoded({extended: true, limit: "16kb"})) // with extended flag, we will get the nested data at deep level
app.use(express.static("public")); // it is a addres folder, where we will keep files which we want to keep in public
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome to TurboTweetsF1");
})

import { adminRouter } from './routes/admin.route.js';
app.use('/api/v1/admin', adminRouter);

import { userRouter } from './routes/user.route.js';
app.use('/api/v1/users', userRouter);

import { raceRouter } from './routes/race.route.js';
app.use('/api/v1/race', raceRouter);

import { driverRouter } from './routes/driver.route.js';
app.use('/api/v1/driver', driverRouter);

import { constructorRouter } from './routes/constructor.route.js';
app.use('/api/v1/constructor', constructorRouter);

import { tournamentRouter } from './routes/tournament.route.js';
app.use('/api/v1/tournament', tournamentRouter);

import { chatRouter } from './routes/chat.route.js';
app.use('/api/v1/chat', chatRouter);

import { messageRouter } from './routes/message.route.js';
app.use('/api/v1/message', messageRouter);

export { app };