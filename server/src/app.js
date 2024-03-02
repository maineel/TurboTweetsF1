import express from 'express';

const app = express();

app.use(express.json({
    limit: "16kb",
}));

import driverRouter from './routes/driver.routes.js';

app.use("/api/v1/driverDetails", driverRouter);

export default app;