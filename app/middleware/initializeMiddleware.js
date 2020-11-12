import express from "express";
import indexRouter from '../../api/v1/index.js';
import passport from  'passport';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from "cors";
import passportjs from '../config/passport.js';
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};

export default (app)=>{
    app.use(passport.initialize())
    passportjs(passport)
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors(corsOption));
    app.use('/v1/api', indexRouter);
}