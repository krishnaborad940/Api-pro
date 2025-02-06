const mongoose=require('mongoose');

const userScheama=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User=mongoose.model('User',userScheama)

module.exports=User