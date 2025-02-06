const express=require('express')

const port=8000;

const app=express()
const db=require('./config/db')

const passport=require('passport')
const jstretergy=require('./config/passport-jwt-stratergy')
const session=require('express-session')

app.use(express.urlencoded())



app.use(session({
    name:'passport-jwt-stratergy',
    secret:'test',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session())




app.use('/',require('./routes'))

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }
    console.log("port is :-",port)
})