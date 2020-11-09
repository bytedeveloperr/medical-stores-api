import mongoose from "mongoose";
import CustomError from "../utils/CustomError.js";

let options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

try {
	await mongoose.connect(process.env.MONGO_URI, options);
	console.log("MongoDB connected successfully...");
} catch (e) {
	console.log(`Error connecting to MongoDB: ${e}`);
}
