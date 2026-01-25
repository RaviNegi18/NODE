import express from "express"
import { userRegister } from "../controllers/user.controller.js";
import { userLogin } from "../controllers/user.controller.js";

const router=express.Router()

router.post("/register", userRegister)
router.post("/login",userLogin)


export default router;