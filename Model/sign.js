const mongoose=require('mongoose');

const SignScheama=mongoose.Schema({
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

const Sign=mongoose.model('Sign',SignScheama)

module.exports=Sign