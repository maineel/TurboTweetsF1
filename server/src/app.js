import express from 'express';

const app = express();

app.use(express.json({
    limit: "16kb",
}));

import driverRouter from './routes/driver.routes.js';
import constructorRouter from './routes/constructor.routes.js';

// app.use("/api/v1/driverDetails", driverRouter);
// app.use("/api/v1/constructorDetails", constructorRouter);

export default app;