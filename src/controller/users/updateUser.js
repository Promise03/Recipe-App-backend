import User from "../../models/users/user.js";
import httpStatus from "http-status";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Assuming bcrypt for password hashing

export const updateUser = async (req, res) => {
  console.log("Request URL:", req.originalUrl);
  console.log("req.params:", req.params);
  console.log("req.body:", req.body);
  console.log("req.user:", req.user); // Assuming middleware attaches req.user

  const { password, username, name, role } = req.body;
  const { id } = req.params;

  // Validate user ID
  if (!id || id === "undefined" || !mongoose.isValidObjectId(id)) {
    console.log("Invalid ID detected:", id);
    return res.status(httpStatus.BAD_REQUEST).json({
      message: `Invalid or missing user ID: ${id}`,
    });
  }

  // Check if user exists
  const user = await User.findById(id);
  if (!user) {
    console.log("User not found for ID:", id);
    return res.status(httpStatus.NOT_FOUND).json({
      message: "User not found",
    });
  }

  // Authorization: Non-admins can only update their own profile
  if (req.user.role !== "admin" && req.user.id !== id) {
    console.log("Unauthorized update attempt by user:", req.user.id);
    return res.status(httpStatus.FORBIDDEN).json({
      message: "You can only update your own profile",
    });
  }

  // Build update object for partial updates
  const updateData = {};
  if (name) updateData.name = name;
  if (username) updateData.username = username;
  if (role && ["admin", "regular"].includes(role)) {
    updateData.role = role;
  } else if (role) {
    console.log("Invalid role provided:", role);
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Invalid role. Must be 'admin' or 'regular'",
    });
  }
  if (password) {
    if (password.length < 6) {
      console.log("Password too short for user ID:", id);
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Password must be at least 6 characters long",
      });
    }
    updateData.password = await bcrypt.hash(password, 10);
  }

  // Check for duplicate username
  if (username && username !== user.username) {
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== id) {
      console.log("Duplicate username detected:", username);
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Username already taken",
      });
    }
  }

  try {
    // Update user with partial data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log("Failed to update user with ID:", id);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update user",
      });
    }

    // Remove sensitive data from response
    const { password: _, ...userData } = updatedUser.toObject();

    res.status(httpStatus.OK).json({
      message: "User profile updated successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(httpStatus.BAD_REQUEST).json({
        message: `Validation failed: ${messages.join(", ")}`,
      });
    }
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Username already taken",
      });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred",
    });
  }
};