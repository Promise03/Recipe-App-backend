import express from "express";
import { registerUser } from "../controller/auth/register.js";
import { login } from "../controller/auth/login.js";
import { getUsers } from "../controller/users/getusers.js";
import { getuser } from "../controller/users/getuser.js";
import { getSingleUser } from "../controller/users/getSingleUser.js";
import { updateUser } from "../controller/users/updateUser.js";
import { deleteUser } from "../controller/users/deleteUser.js";
import { authorizeUser, checkRole } from "../middleware/auth.js";

// configure express route
const router = express.Router();


// defining endpoint from routes
router.route("/register-user").post(registerUser);
router.route("/login").post(login);
router.route("/all-users").get(authorizeUser, checkRole("admin", "regular"), getUsers)
router.route("/get-user").get(authorizeUser, checkRole("admin"),getuser);
router.route("/get-user/:id").get(getSingleUser);
router.route("/update-profile/:id").patch(authorizeUser, checkRole("admin", "regular"),updateUser);
router.route("/delete-user/:id").delete(authorizeUser, checkRole("admin"), deleteUser);


export default router;