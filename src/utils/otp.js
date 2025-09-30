import bcrypt from "bcrypt";
import Otptoken from "../models/otp/otp.js";

export const generateNumericOtp = () => {
    return Math.floor(100000 + Math.random() * 90000).toString();

}

export const createAndSaveOtp =async (userId, expiredminutes = 30 ) => {
await Otptoken.updateMany({userId, used: false},{used: true});

const otp = generateNumericOtp();
const otpHash = await bcrypt.hash(otp, 10);
const expiresAt = new Date(Date.now() + expiredminutes * 60 * 1000)

const doc = await Otptoken.create({
    userId,
    otpHash,
    expiresAt,
});
return{otp, doc}
}