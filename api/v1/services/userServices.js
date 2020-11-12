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
            isExist = _.pick(isExist,['email','full_name','gender','role','_id']);
            let payload={full_name:isExist.full_name, id:isExist._id,
                userType:isExist.userType, email:isExist.email,}
    let token = jwt.sign(payload, process.env.jwtSecret, {expiresIn:process.env.accessTokenexpires_expiresIn });
    let refreshToken = jwt.sign(payload,process.env.jwtSecret, {expiresIn: process.env.refreshToken_expiresIn });
      token=`Bearer ${token}`
      refreshToken=`Bearer ${refreshToken}`
            return {userDetails:isExist,token,refreshToken}

    }
    async register(req,res){
        let {email,first_name,last_name,password,confirm_password,gender} = req.body;
        const emailRegex = /[\w|.]+[@]+\w+[.]+[\w|.]*$/gm;
        if (!email) throw new CustomError("please provide your email");
        const isEmailValid = await emailRegex.test(email);  
        const isUserExist = await User.findOne({email})     
    if (isUserExist) {throw new CustomError("email already taken"); }
    if (!isEmailValid) {throw new CustomError("please provide a valid email"); }
    if (!first_name) {throw new CustomError("please provide your first name"); }
    if (!last_name) {throw new CustomError("please provide your last name"); }
    if (!password) {throw new CustomError("please provide your password"); }//confirm_password
    if (!confirm_password) {throw new CustomError("please  input your password again to confirm"); }
    if (password.length<6) {throw new CustomError("password must not be less than six character"); }
    if (password!==confirm_password) {throw new CustomError("password does not match"); }
    if (!gender  ||!['male','female'].includes(gender)) {throw new CustomError("specify a valid gender"); }
    let full_name = `${first_name}-${last_name}`
    let saveUser = await new User({
        full_name,email,password,gender
    }).save()
    
    return 


    }

}
export default new userServ()