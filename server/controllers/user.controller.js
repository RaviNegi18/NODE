import * as services from "../services/user.service.js"

export const userRegister = async (req, res) => {
  try {
    const result = await services.register(req.body);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,  
      
      message: result.message,
      user: result.user,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const userLogin =async(req,res)=>{
  try{
    const result=await services.login(req.body)

    //savein cookie

    res.cookie("accessToken", result.accessToken,{
      httpOnly:true,
      secure:true,
      sameSite:"strict",
      maxAge:15*60*1000
    })

    //save this refersstoken

    res.cookie("refreshToken", result.refreshToken,{
      httpOnly:true,
      secure:true,
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    })

  }catch(err){
    res.status(400).json({ success: false, message: err.message });
  }
}