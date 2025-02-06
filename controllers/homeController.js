const User = require("../Model/curdModel")

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
        let deledata=await User.findByIdAndDelete(req.params.id)
        if(deledata){
            return res.status(200).json({"msg":"data deletd succesfully",data:deledata})
        }else{
            return res.status(400).json({"msg":"data not deletd succesfully"})
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

        console.log(req.body)
        let checkemail=await User.findById(req.params.id)
            if(checkemail){
                let edituser=await User.findByIdAndUpdate(req.params.id,req.body)
                if(edituser){
            //    let updates   =  await User.findById(req.parms.id)
            //      let userupdate=await User.findByIdAndUpdate(updates._id,req.body)
                    return res.status(200).json({"msg":"data updated succesfully",data:edituser})
                }else{
                    return res.status(400).json({"msg":"data not updated succesfully"})
                }
            }else{
                return res.status(200).json({"msg":"data not  found"})
            }
    }catch(err){
        return res.status(400).json({"msg":"data not updated succesfully"})
    }
}