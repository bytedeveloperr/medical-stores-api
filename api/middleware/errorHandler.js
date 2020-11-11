import express from 'express';
import response from '../../app/utils/response.js';
const app = express()


import CustomError from "../../app/utils/CustomError.js";
import v1 from "../v1/index.js";




export default (app)=>{
    app.use("/v1", v1);

app.use("*", (req, res, next) => {
	let err = new CustomError("route not found", 404);
	next(err);
});

app.use((error, req, res, next) => {
	switch (true) {
        case error instanceof CustomError :
            res.status(400).json(response( error.message, null,false))
            break;
        case error.name == 'SyntaxError' :
            res.status(400).json(response( error.message, null,false))
            break;
           //
        case error.name == 'JsonWebTokenError' :
            res.status(400).json(response( error.message, null,false))
            break;
       case error.message == 'getaddrinfo ENOTFOUND smtp.gmail.com' :
            res.status(400).json(response( 'please check your internet connection ', null,false))
            break;
        case error.name == 'CastError' :
            res.status(400).json(response( "Invalid ID", null,false))
            break;
        case error.name == 'ValidationError' :
            res.status(400).json(response( error.message, null,false))
            break;
       default:
           res.status(500).json(response( error.message, null,false))
           break;
   }
});
}