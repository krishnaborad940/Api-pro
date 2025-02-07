const User = require("../Model/curdModel")
const fs=require('fs')
const path=require('path')

module.exports.insertData=async(req,res)=>{
    try{
 // console.log("insertData")

 let userData=await User.find()
 if(userData){
    return res.status(200).json({"msg":"data view succesfully",data:userData})
 }else{

    return res.status(400).json({"msg":"data not view succesfully"})
 }
    }catch(err){
 return res.status(400).json({"msg":"data insert not succesfully"})
    }
}

module.exports.addData=async(req,res)=>{
    try{
        
     
let newImg=''
     if(req.file){
        newImg=await User.ImgPath+'/'+req.file.filename
     }
     req.body.Image=newImg
     let userData=await User.create(req.body)
if(userData){
    return res.status(200).json({"msg":"data insert succesfully",data:userData})
}else{

  return res.status(400).json({"msg":"data not insert succesfully"})
}

    }
    catch(err){
        return res.status(400).json({"msg":"data insert not succesfully"})
    }
}

module.exports.deletedata=async(req,res)=>{
    try{
let userRecordFind=await User.findById(req.params.id)
if(userRecordFind){
    try{
    let deleImg=path.join(__dirname,'..',userRecordFind.Image)
        await fs.unlinkSync(deleImg)
    }catch(err){
        return res.status(200).json({msg:'data not found'})
    }
       let deledata=await User.findByIdAndDelete(req.params.id)
        if(deledata){
            return res.status(200).json({"msg":"data deletd succesfully",data:deledata})
        }else{
            return res.status(400).json({"msg":"data not deletd succesfully"})
        }
}    
    }catch(err){
 return res.status(400).json({"msg":"data not deletd succesfully"})
    }
}


module.exports.editdata=async(req,res)=>{
    try{
console.log(req.query.curdId)
console.log(req.body)
let checkId=await User.findById(req.query.curdId)
if(checkId){
return res.status(200).json({'msg':"get data succesfully",data:checkId})
}else{
 return res.status(200).json({"msg":"data not  found"})

}
    }catch(err){
 return res.status(400).json({"msg":"data not deletd succesfully"})

    }
}


module.exports.updatedata=async(req,res)=>{
    try{

if(req.file){
        let userRecord=await User.findById(req.params.id)
    try{
        let delImg=path.join(__dirname,'..',userRecord.Image);
            await fs.unlinkSync(delImg)
           
         }catch(err){
        return res.status(400).json({"msg":"image not deleted"})
    }

      req.body.Image=User.ImgPath+'/'+req.file.filename

            let edituser=await User.findByIdAndUpdate(req.params.id,req.body)
                if(edituser){
               let updates   =  await User.findById(edituser._id)
                    return res.status(200).json({"msg":"data updated succesfully",data:updates})
                }else{
                    return res.status(400).json({"msg":"data not updated succesfully"})
                }
   
}else{
let userRecord=await User.findById(req.params.id)
     req.body.Image=userRecord.Image

let edituser=await User.findByIdAndUpdate(req.params.id,req.body)
                if(edituser){
               let updates   =  await User.findById(edituser._id)
                    return res.status(200).json({"msg":"data updated succesfully",data:updates})
                }else{
                    return res.status(400).json({"msg":"data not updated succesfully"})
                }
           
}



     
                




     
    }catch(err){
        return res.status(400).json({"msg":"data not updated succesfully"})
    }
}