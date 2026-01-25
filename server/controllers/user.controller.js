// User Controllers
import * as services from "../services/user.service.js";

export const userRegister = async (req, res) => {
    console.log("here is req-----",req.body)
  try {
    const result = await services.register(req.body);


    return res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token,   // if token is generated on register
    });

  } catch (error) {
    console.error("Register Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};


export const userLogin = async (req, res) => {
  try {
    const result = await services.login(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token,
    });

  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};
