import express from "express";
import { adminProfile, loginUser, logout, refreshToken, registerUser, userProfile } from "../controllers/User.Controller.js";
import { verifyAdmin, verifyuser } from "../middleware/Auth.middleware.js";
const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refresh-token",refreshToken)

router.get("/user",verifyuser,userProfile)
router.get("/admin",verifyuser,verifyAdmin,adminProfile)
router.get("/logout",verifyuser,logout)

export default router;