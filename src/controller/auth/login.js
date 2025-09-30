import User from "../../models/users/user.js";
import { loginSchema } from "../../validation/authvalidator.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
// import { jwtTemToken } from "../../utils/generateToken.js";
import { createAndSaveOtp } from "../../utils/otp.js";
import { sendOtpEmail } from "../../utils/email.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }

    // ✅ Collect login credentials
    const { email, password } = req.body;

    // ✅ Check if user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "login error",
        message: "No record found",
      });
    }

    // ✅ Compare password
    const isConfirmed = await ComparePassword(password, userExist.password);
    if (!isConfirmed) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Credential not correct",
      });
    }

    // ✅ Credentials valid → Create OTP + Save
    const { otp } = await createAndSaveOtp(
      userExist._id,
      Number(process.env.OTP_EXPIRY_MINUTES || 10)
    );

    // ✅ Send OTP email
    try {
      await sendOtpEmail(userExist.email, otp);
      
    } catch (mailErr) {
        console.error("Email error:", mailErr);   // 👈 add this
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Failed to send OTP email",
      });
    }

    // ✅ Create short-lived temp token (for OTP session)
    const tempToken = jwt.sign(
      {sub: userExist._id.toString(), type: "otp"},
      process.env.JWT_SECRET,
      {expiresIn: "15m"} 
    )

    // ✅ Build safe user object (don’t leak hashed password!)
    const safeUser = {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    };

    // ✅ Send response
      return res.status(httpStatus.OK).json({
      status: "success",
      message: "OTP sent to your email. Please verify to complete login.",
      user: safeUser,
      tempToken, // frontend will use this for OTP verification
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });
  }
};

// ✅ Password comparison helper
async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}