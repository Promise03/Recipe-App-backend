import Joi from "joi";

export const createRecipeSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    ingredients: Joi.string().min(5).required(),
    instructions: Joi.string().min(10).required(),
    videoUrl: Joi.string().required()
});


export const updateRecipeSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    ingredient:  Joi.string().min(5).required(),
    instruction: Joi.string().min(10),
    videoUrl: Joi.string().required()
});

