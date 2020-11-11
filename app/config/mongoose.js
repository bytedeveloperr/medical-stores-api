import mongoose from "mongoose";
// import CustomError from "../utils/CustomError.js";

let options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};



export default ()=>{
    mongoose
            .connect(process.env.MONGO_URI, options)
            .then(() => console.log(`MongoDB connected successfully...`))
            .catch((error) => console.log(":: Error connecting to MongoDB "));
}

