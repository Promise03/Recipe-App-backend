import Otptoken from "../../models/otp/otp.js";
import User from "../../models/users/user.js";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { generateToken } from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";


const verifyOtp = async (req, res) => {
  try {
    // 1. extract temp token
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Missing temp token" });
    }

    // 2. verify temp token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.type !== "otp") throw new Error("Invalid token type");
    } catch (err) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired temp token" });
    }

    const { sub: userId } = payload;
    const { otp } = req.body;
    if (!otp) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "OTP required" });
    }

    // 3. find the latest unused OTP for user
    const otpDoc = await Otptoken.findOne({ userId, used: false }).sort({ createdAt: -1 });
    if (!otpDoc) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "No active OTP found" });
    }

    // 4. check expiry
    if (otpDoc.expiresAt < new Date()) {
      otpDoc.used = true;
      await otpDoc.save();
      return res.status(httpStatus.BAD_REQUEST).json({ message: "OTP expired" });
    }

    // 5. compare hashed OTP
    const match = await bcrypt.compare(otp, otpDoc.otpHash);
    if (!match) {
        // increment attempt count and disable otp after 5 failed tries.
      otpDoc.attempts += 1;
      // lock after X attempts (e.g., 5)
      if (otpDoc.attempts >= 5) {
        otpDoc.used = true;
      }
      await otpDoc.save();
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid OTP." });
    }

    // 6. success -> mark the otp as used and issue a final authentication token
    otpDoc.used = true;
    await otpDoc.save();

    const user = await User.findById(userId).select("-password"); // exclude password
       if(!user){
        return res.status(httpStatus.NOT_FOUND).json({ message: "User not found"})
    }
    const finalToken = generateToken(user._id, user.email, user.role); // your existing util
 

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "OTP verified",
      data: user,
      token: finalToken,
    });
  } catch (err) {
    console.error("OTP verfication error:", err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "An internal server error ocurred.",
    });
  }
};

export { verifyOtp };

