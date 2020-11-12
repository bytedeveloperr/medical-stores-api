import http from "http";
import app from "../app.js";
import database from "../app/config/mongoose.js";
import dotenv from "dotenv";
dotenv.config()


const server = http.createServer(app);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>{
     console.log(`listening on port ${PORT}`)
     database()
});
