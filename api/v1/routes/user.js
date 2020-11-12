import express from "express";
import response from "../../../app/utils/response.js";
import userCntr from "../controller/userController.js";
const router = express.Router();






//login

router.post("/login",userCntr.login);
//register
router.post("/register",userCntr.register);
router.post("/F",userCntr.register);

export default router;
