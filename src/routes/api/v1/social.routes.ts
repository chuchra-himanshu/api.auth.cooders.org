// Import Section
import express, { type Router } from "express";
import CONTROLLERS from "../../../controllers";

// Configuration Section
const router: Router = express.Router();
const {
  googleOAuth,
  googleOAuthCallback,
  githubOAuth,
  githubOAuthCallback,
  linkedInOAuth,
  linkedInOAuthCallback,
} = CONTROLLERS.V1_CONTROLLERS.SOCIAL_CONTROLLERS;

// Routes Section
router.route("/oauth/google").post(googleOAuth);
router.route("/oauth/google/callback").get(googleOAuthCallback);
router.route("/oauth/github").post(githubOAuth);
router.route("/oauth/github/callback").get(githubOAuthCallback);
router.route("/oauth/linkedin").post(linkedInOAuth);
router.route("/oauth/linkedin/callback").get(linkedInOAuthCallback);

// Export Section
export default router;
