// Import Section
import express, { type Router } from "express";
import localRouter from "./local.routes";
import socialRouter from "./social.routes";
import tokenRouter from "./token.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Section
router.use("/local", localRouter);
router.use("/social", socialRouter);
router.use("/tokens", tokenRouter);

// Export Section
export default router;
