import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";
import { createRecipeSchema } from "../../validation/recipevalidate.js";
import logger from "../../utils/logger.js";
import User from "../../models/users/user.js";
const createRecipe = async (req, res) => {
  try {
    //   validate data from our request body
    const { error } = createRecipeSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }
    // destructure recipe data from the request body
    const { title, ingredients, instructions, videoUrl} = req.body;
    const image = req.file ? req.file.filename : null;
    const existingTitle = await Recipe.findOne({
      title,
    });
    if (existingTitle) {
      return res.status(httpStatus.FOUND).json({
        status: "Error",
        message: "Title or Recipe already exists",
      });
    }

    //create recipe
    const createdRecipe = await Recipe.create({
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
      videoUrl: videoUrl,
      userId: userId,
    });
    const user = await User.findById(createRecipe.userId)
    // return a response to the users
    res.status(httpStatus.CREATED).json({
      status: "Success",
      recipe: createdRecipe,
      
    });
    logger.info(`Recipe created successfully`);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "An error occured while creating Recipe",
      error: error.message,
    });
  }
  logger.error(`An error occured while creating Recipe`);
};

export { createRecipe };