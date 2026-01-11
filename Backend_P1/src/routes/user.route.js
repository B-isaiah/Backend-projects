import { Router } from "express";
import { registerUser } from "./controllers/user.controller.js";
import { loginUser } from "./controllers/user.controller.js";
import { logoutUser } from "./controllers/user.controller.js";

const router = Router(); // create a router instance

router.route('/register').post (registerUser); // define the register route
router.route('/login').post (loginUser); // define the login route
router.route('/logout').post (logoutUser); // define the logout route

export default router;

