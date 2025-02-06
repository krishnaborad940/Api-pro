const express=require('express')

const routes=express.Router()

const authCtl=require('../controllers/AuthController')

routes.post('/signup',authCtl.signup)

routes.post('/signin',authCtl.signin)


module.exports=routes