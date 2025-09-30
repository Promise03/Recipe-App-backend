import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { registerSchema } from "../../validation/authvalidator.js";
import User from "../../models/users/user.js";
// import { encrypt } from "../../utils/crypto.js";
import logger from "../../utils/logger.js";

//controller function to register users
const registerUser = async (req, res) => {
  try {
    // validate the request body with the registerSchema
    const {error} = registerSchema.validate(req.body);

    if (error){
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message
      })
    }
    const { name, username, password, email, role } = req.body;
    const emailExists =await User.findOne({
      email,
    });

    if (emailExists) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: "User with email already exists",
      });
    }

    const userName = await User.findOne({
      username,
    });

    if (userName) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "Error",
        message: "Username already exists",
      });
    }

    //hash your password before saving to database
    const hashedPassword =await bcrypt.hash(password, 10);

    // exrypt username but store only ciphertext (string)
    // const encryptedUsername = encrypt(userName)

    //create and save user details to the database
    const createdUser =await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    //send a response(as view after successful registration)
    res.status(httpStatus.CREATED).json({
      status: "Success",
      message: "User registered successful",
      userDetails: createdUser,
    });
    logger.info(`User registered: ${userDetails.name}`);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "An error occurred while registering user",
      error: error.message,
    });
  }
  logger.error(`Error in registerUser: ${error.message}`);
  next(error);
};

export { registerUser };