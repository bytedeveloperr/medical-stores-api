import express from "express";
import path from "path";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import exp from "express-async-errors";
const app = express();

// import "./app/config/mongoose.js";
import initialize from "./api/middleware/initializeMiddleware.js";
import errorHandler from "./api/middleware/errorHandler.js";
initialize(app)
errorHandler(app)





export default app;
