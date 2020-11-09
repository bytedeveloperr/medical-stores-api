import express from "express";
import path from "path";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

// import "./app/config/mongoose.js";
import CustomError from "./app/utils/CustomError.js";
import v1 from "./api/v1/index.js";

const app = express();

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/v1", v1);

app.use("*", (req, res, next) => {
	let err = new CustomError("route not found", 404);
	next(err);
});

app.use((err, req, res, next) => {
	err.statusCode = err.statusCode ? err.statusCode : 500;
	if (err) {
		res.status(err.statusCode).json({
			message: err.message,
			statusCode: err.statusCode,
		});
	}
});

export default app;
