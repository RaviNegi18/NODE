import express from "express"
import { userRegister } from "../controllers/user.controller.js";
import {userLogin} from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/authmiddleware.js";
import { refreshAccessToken } from "../controllers/refreshToken-controller.js";
const router=express.Router()

router.post("/register", userRegister)
router.post("/login",authMiddleware, userLogin)


export default router;