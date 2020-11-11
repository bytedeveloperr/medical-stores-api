import passportJwt from 'passport-jwt';
import User  from "../../api/v1/models/userModel.js";
const key = process.env.jwtSecret;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
  const opts={};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() 
  opts.secretOrKey=key
  export default  passport=>{
      passport.use(
          new JwtStrategy(opts,(jwt_payload,done)=>{
     User.findById(jwt_payload.id)
     .then((user)=>{
         if(user)
            return done(null,user)
         return done(null,false);
     })
     .catch(err=>{
         console.log(err)
     })
          })
      )
  }