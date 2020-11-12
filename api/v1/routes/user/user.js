import express from "express";
import passport from "passport";
import userCntr from "../../controller/userController.js";
const router = express.Router();
const auth = passport.authenticate('jwt',{session:false});
            





//login

router.post("/login",userCntr.login);
//register
router.post("/register",userCntr.register);
//auth route
//just for test
router.post("/F",auth,userCntr.register);

export default router;
