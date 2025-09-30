import httpStatus from "http-status";
import Recipe from "../../models/recipe/recipe.js";

const getRecipeStats = async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments({});

    const stats = await Recipe.aggregate([
      // Stage 1: Add a field for the date without the time
      {
        $addFields: {
          recipeDate: { $dateTrunc: { date: "$createdAt", unit: "day" } },
        },
      },
      // Stage 2: Group by the new date field to count recipes per day
      {
        $group: {
          _id: "$recipeDate",
          recipesAdded: { $sum: 1 },
        },
      },
      // Stage 3: Sort the results by date
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(httpStatus.OK).json({
      status: "Success",
      message: "Recipe statistics retrieved successfully.",
      data: {
        totalRecipes: totalRecipes,
        recipesAddedPerDay: stats,
      },
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: err.message,
    });
  }
};

export { getRecipeStats };