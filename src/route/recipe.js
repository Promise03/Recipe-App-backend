import express from 'express';
import { createRecipe } from '../controller/recipe/createRecipe.js';
import { getSingleRecipe } from '../controller/recipe/getSIngleRecipe.js';
import { getRecipe } from '../controller/recipe/getAllRecipe.js';
import { deleteRecipe } from '../controller/recipe/deleteRecipe.js';
import { updateRecipe } from '../controller/recipe/updateRecipe.js';
import { authorizeUser, checkRole } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post('/create-recipe', authorizeUser, checkRole("admin"), upload.single("image"), createRecipe);
router.get('/recipe-details/:id', getSingleRecipe);
router.get('/all-recipes', getRecipe);
router.patch('/update-recipe/:id', authorizeUser, checkRole("admin", "regular"), upload.single("image"), updateRecipe);
router.delete('/delete-recipe/:id', authorizeUser, checkRole("admin"), deleteRecipe);


export default router;