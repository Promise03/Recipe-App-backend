import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

const apilimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX,
    message:{
        status: httpStatus.TOO_MANY_REQUESTS,
        message: "Too many request, please try again later."
    },

    standardHeaders: true,
    legacyHeaders: false
}) 


export {apilimiter}

