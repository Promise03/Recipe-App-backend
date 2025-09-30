import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";
import { isValidObjectId } from "mongoose";

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, videoUrl } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Invalid recipe ID format",
      });
    }

    // Prepare update object
    const updates = {
      title,
      description,
      ingredients,
      instructions,
      videoUrl,
    };

    // Handle image file if uploaded
    if (req.file) {
      updates.image = req.file.path; // Assumes multer saves the file path
    }

    // Update recipe
    const recipe = await Recipe.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT FOUND",
        message: "Recipe not found!",
      });
    }

    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Recipe updated successfully!",
      recipe,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: e.message,
    });
  }
};