import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";
import { isValidObjectId } from "mongoose";

export async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Invalid recipe ID format",
      });
    }
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT FOUND",
        message: "No Recipe found!",
      });
    }
    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Recipe deleted successfully!",
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: e.message,
    });
  }
}