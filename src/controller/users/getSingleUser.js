import User from "../../models/users/user.js";
import httpStatus from "http-status";
import mongoose from "mongoose";

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || id === "undefined") {
      console.log("Missing ID in request:", id);
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Please provide a valid user ID",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      console.log("Invalid ObjectId:", id);
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Invalid user ID format",
      });
    }

    // Find user
    const user = await User.findById(id).select("-password"); // Exclude password
    if (!user) {
      console.log("User not found for ID:", id);
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    // Return user data directly to match frontend expectations
    return res.status(httpStatus.OK).json({
      name: user.name,
      username: user.username,
      role: user.role || "regular", // Fallback for role
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error.name === "CastError") {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Invalid user ID format",
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred",
    });
  }
};