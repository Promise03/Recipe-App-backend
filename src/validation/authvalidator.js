import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().alphanum().min(4).max(14).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("regular", "admin").required(),
});

// login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required(),
});

export { registerSchema, loginSchema };