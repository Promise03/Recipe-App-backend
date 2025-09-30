
import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status"


// controller function to get all stored recipe

export const getRecipe = async (req, res) => {
    try{
        const recipe = await Recipe.find({ })
        if (recipe){
            return res.status(httpStatus.OK).json({
                status:"success",
                recipeDetails: recipe
            })
        }else{
             return res.status(httpStatus.NOT_FOUND).json({
                status:"error",
                message: "No recipe(s) found!"
        })
             }
    }
    catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Not Found",
            message: "No recipe(s) found!",
        })
        
    }
};