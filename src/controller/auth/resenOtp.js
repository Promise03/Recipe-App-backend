import User from "../../models/users/user";
import Otptoken from "../../models/otp/otp";
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken'

// controllers/authController.js (append)
const resendOtp = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Missing temp token" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.type !== "otp") throw new Error("Invalid token type");
    } catch (err) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired temp token" });
    }

    const userId = payload.sub;

    // check last OTP created timestamp
    const last = await Otptoken.findOne({ userId }).sort({ createdAt: -1 });
    if (last && (Date.now() - new Date(last.createdAt).getTime()) < 60 * 1000) {
      return res.status(httpStatus.TOO_MANY_REQUESTS).json({ message: "Please wait before requesting another OTP." });
    }

    // create & send new OTP
    const { otp } = await createAndSaveOtp(userId, Number(process.env.OTP_EXPIRE_MINUTES || 10));
    const user = await User.findById(userId);
    await sendOtpEmail(user.email, otp);

    return res.status(httpStatus.OK).json({ message: "OTP resent" });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export {  resendOtp };
