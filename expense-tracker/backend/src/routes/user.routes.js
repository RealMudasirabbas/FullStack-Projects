import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
const router = Router();

//secured routes
router.route("/register").post(registerUser);
router.route("/login").get(loginUser);

export default router