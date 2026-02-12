import express from "express"
import { userRegister, userLogin } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { refreshAccessToken } from "../controllers/refreshToken-controller.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

// // Protected route example
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({ message: "This is a protected route" });
// });

// Refresh token route (no auth middleware!)
// router.post("/refresh-token", refreshAccessToken);

export default router;
