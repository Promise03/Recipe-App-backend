import express from "express";
import { verifyOtp } from "../controller/auth/verifyOtp.js";

const router = express.Router()
router.post("/verify-otp", verifyOtp)

export default router