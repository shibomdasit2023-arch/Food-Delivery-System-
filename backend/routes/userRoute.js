import express from "express";

import {
    loginUser,
    registerUser,
    getProfile,
    updateProfile, 
    changePassword,
    sendOTP,
    verifyOTP,
    resetPassword
} from "../controllers/userController.js";

import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Authentication
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/send-otp", sendOTP);
userRouter.post("/verify-otp", verifyOTP);
userRouter.put("/reset-password", resetPassword);

// Profile
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.put("/profile", authMiddleware, updateProfile);

userRouter.put(
    "/change-password",
    authMiddleware,
    changePassword
);

export default userRouter;