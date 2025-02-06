const Sign = require("../Model/sign")

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')

module.exports.signup=async(req,res)=>{
    try{
        console.log(req.body)
        let checkEmail=await Sign.find({email:req.body.email}).countDocuments();
        if(checkEmail==0){
              if(req.body.password==req.body.confirmpassword){
                    req.body.password=await bcrypt.hash(req.body.password,10)
                    let sigupdata=await Sign.create(req.body)
                    if(sigupdata){
                        return res.status(200).json({msg:'signup succesfully',data:sigupdata})
                    }else{
                        return res.status(200).json({msg:"signup failed"})
                    }
                }else{
                    return res.status(400).json({'msg':"Password not match"})
                }

        }else{
             return res.status(400).json({'msg':"Email already exist"})
        }

    }catch(err){
        return res.status(400).json({'msg':"signup failed"})
    }
}

module.exports.signin=async(req,res)=>{
    try{
let checkemail=await Sign.findOne({email:req.body.email})
if(checkemail){
    checkPass=await bcrypt.compare(req.body.password,checkemail.password)
    if(checkPass){
        let token=await jwt.sign({userData:checkemail},"rnw")
        return res.status(200).json({msg:'signin succesfully',data:token})
    }else{
        return res.status(400).json({'msg':"Password not match"})
    }
}else{
    return res.status(400).json({'msg':"Email not found"})
}

    }catch(err){
        return res.status(400).json({'msg':"signIn failed"})

    }
}