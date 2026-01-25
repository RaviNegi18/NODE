//here we will built user controllersa

import * as services from "../services/user.service.js";
const userRegister = async (req, res) => {
  try {
    const user = await services.register(req.body);
    return res.json({
        user
    });
  } catch (error) {
    console.log("there is an error in register", error.messege);
  }
};


const userLogin=async(req,res)=>{
    try{
const user=await services.login(req.body)
    }catch(error){
        console.error("there is error in login",error)
    }
}