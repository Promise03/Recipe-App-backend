import httpStatus from "http-status";
import User from "../../models/users/user.js";
export const getUsersWithRecipes = async (req, res) => {
  try {
    const usersWithRecipes = await User.aggregate([
      {
        $lookup: {
          from: "recipes", // collection name in MongoDB
          localField: "_id",
          foreignField: "userId",
          as: "recipes",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          recipes: {
            title: 1,
            ingredients: 1,
            instructions: 1,
            image: 1,
            videoUrl: 1,
            createdAt: 1,
          },
        },
      },
    ]);

    return res.status(httpStatus.OK).json({
      status: "Success",
      message: "Users with their recipes retrieved successfully.",
      data: usersWithRecipes,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: err.message,
    });
  }
};