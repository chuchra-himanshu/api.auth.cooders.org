// Import Section
import express, { type Express } from "express";
import dotenv from "dotenv";
import { ENV_CONSTANTS } from "./constants";

// Configuration Section
dotenv.config();
const app: Express = express();
const PORT: number = ENV_CONSTANTS.PORT;

// Igniting Server
try {
  app.listen(PORT, () => {
    console.log(`SUCCESS - Ignited Express Server at http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(
    `ERROR - Connecting Express Server at http://localhost:${PORT}`,
    error
  );
  process.exit(1);
}
