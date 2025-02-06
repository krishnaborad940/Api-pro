const passport=require('passport')
const Sign = require('../Model/sign')
const { sign } = require('jsonwebtoken')

const jStratergy=require('passport-jwt').Strategy

const Ejwt=require('passport-jwt').ExtractJwt

let opts={
    jwtFromRequest:Ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :'rnw'
}

passport.use(new jStratergy(opts,async(payload,done)=>{
    let checkEmail=await Sign.findOne({email:payload.userData.email});
    if(checkEmail){
        return done(null,checkEmail)
    }
    else{
        return done(null,false)
    }
}))
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let userdata=await Sign.findById(id);
    if(userdata){
        return done(null,userdata)
    }else{
        return done(null,false)
    }
})