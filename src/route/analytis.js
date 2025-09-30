import express from 'express';
import getUserCountByRole from '../controller/anaylitic/analyticsController.js';
import { authorizeUser, checkRole } from '../middleware/auth.js';
import { userStats } from '../controller/anaylitic/UserStas.js';
import {getRecipeStats} from '../controller/anaylitic/recipestast.js';



const router = express.Router();

router.get("/user-role-count", authorizeUser, checkRole("admin"), getUserCountByRole)
router.get("/user-stats", authorizeUser, checkRole("admin"), userStats);


router.get("/recipe-stats", authorizeUser, checkRole("admin"), getRecipeStats);



export default router;