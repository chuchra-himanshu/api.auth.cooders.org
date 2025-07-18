// Import Section
import express, { type Router } from "express";
import CONTROLLERS from "../../../controllers";

// Configuration Section
const router: Router = express.Router();
const {
  generateForgetPasswordToken,
  verifyForgetPasswordToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generateTFAToken,
  verifyTFAToken,
} = CONTROLLERS.V1_CONTROLLERS.TOKEN_CONTROLLERS;

// Routes Section
router.route("/creation/password").get(generateForgetPasswordToken);
router.route("/verifications/password").post(verifyForgetPasswordToken);
router.route("/creation/email").get(generateEmailVerificationToken);
router.route("/verifications/email").post(verifyEmailVerificationToken);
router.route("/creation/tfa").get(generateTFAToken);
router.route("/verifications/tfa").post(verifyTFAToken);

// Export Section
export default router;
