const mongoose=require('mongoose');

const path=require('path')

const multer=require('multer')

const ImagePath='/uploads'

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
    },
    Image:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },status:{
        type:Boolean,
        default:true
    }
},{timestamps:true})


const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

userScheama.statics.uploadeImg=multer({storage:storageImage}).single('Image')
userScheama.statics.ImgPath=ImagePath

const User=mongoose.model('User',userScheama)

module.exports=User