const express=require('express')

const routes=express.Router();

const homeCtl=require('../controllers/homeController')
const passport=require('passport');
const User = require('../Model/curdModel');


routes.get('/',passport.authenticate('jwt',{failureRedirect:"/unAuth"}),homeCtl.insertData)
routes.post('/addData',passport.authenticate('jwt',{failureRedirect:"/unAuth"}),User.uploadeImg,homeCtl.addData)

routes.get('/unAuth',async(req,res)=>{
    return res.status(400).json({msg:'unAuthenticted'})
})

routes.delete('/deletedata/:id',passport.authenticate('jwt',{failureRedirect:"/unAuth"}),homeCtl.deletedata)

routes.get('/editdata',passport.authenticate('jwt',{failureRedirect:"/unAuth"}),homeCtl.editdata)

routes.put('/updatedata/:id',passport.authenticate('jwt',{failureRedirect:"/unAuth"}),User.uploadeImg,homeCtl.updatedata)



routes.use('/Auth',require('./Auth'))

module.exports=routes;