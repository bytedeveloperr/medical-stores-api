import express from 'express';
import CustomError from '../../../app/utils/CustomError.js';
import User from '../models/userModel.js';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


class userServ{
    async login(req,res){
        let {email,password} = req.body;
        const emailRegex = /[\w|.]+[@]+\w+[.]+[\w|.]*$/gm;
        if (!email) throw new CustomError("please provide your email");
        const isEmailValid = await emailRegex.test(email);       
    if (!isEmailValid) {throw new CustomError("please provide a valid email"); }
    let isExist = await User.findOne({email:email})
    if (!isExist) throw new CustomError("user does not have account with us,please hit the register button");
    const isCorrect = await  bcrypt.compare(password,isExist.password)
    if (!isCorrect) throw new CustomError("password does not match");;
            isExist = _.pick(isExist,['email','userName','userType']);
            let payload={userName:isExist.userName, id:isExist._id,
                userType:isExist.userType, email:isExist.email,}
    const token = jwt.sign(payload, process.env.jwtSecret, {expiresIn:process.env.accessTokenexpires_expiresIn });
      const refreshToken = jwt.sign(payload,process.env.jwtSecret, {expiresIn: process.env.refreshToken_expiresIn });
            return {userDetails:isExist,token,refreshToken}

    }
    async register(req,res){
    }

}
export default new userServ()