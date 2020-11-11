import express from 'express';
import response from '../../../app/utils/response.js';
import userServ from '../services/userServices.js';


class userCntr{
    async login(req,res){
        let  data = await userServ.login(req,res)
            res.json(response("successfully logged in",data,200));

    }
    
    async register(req,res){
        let  data = await userServ.register(req,res)
            res.json(response("successfully registered",data,201));

    }

}
export default new userCntr()