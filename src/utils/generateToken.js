import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const {JWT_SECRET, JWT_EXPIRY} = process.env

export const generateToken = (id, email, role) =>{
    return JWT.sign({id, email, role}, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    })
}



