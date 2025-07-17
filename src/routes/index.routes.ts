// Import Section
import express, { type Router } from "express";
import apiRouter from "./api/index.routes";

// Configuration Section
const router: Router = express.Router();

// Middleware Section
router.use("/api", apiRouter);

// Export Section
export default router;
