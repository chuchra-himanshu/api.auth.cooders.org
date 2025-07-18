// Import Section
import express, { type Router } from "express";
import CONTROLLERS from "../../../controllers";

// Configuration Section
const router: Router = express.Router();
const {
  signup,
  signin,
  signout,
  forgetPassword,
  changePassword,
  changeUsername,
} = CONTROLLERS.V1_CONTROLLERS.LOCAL_CONTROLLERS;

// Routes Section
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/signout").get(signout);
router.route("/forgets/password").post(forgetPassword);
router.route("/updates/password").post(changePassword);
router.route("/updates/username").post(changeUsername);

// Export Section
export default router;
