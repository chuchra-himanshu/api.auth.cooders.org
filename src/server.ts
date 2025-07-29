// Import Section
import express, { type Express } from "express";
import dotenv from "dotenv";
import { ENV_CONSTANTS } from "./constants";
import router from "./routes/index.routes";
import { connectToDatabase } from "./config";

// Configuration Section
dotenv.config();
const app: Express = express();
const PORT: number = ENV_CONSTANTS.PORT;

// Middleware Section
app.use("/", router);

// Igniting Server
try {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `SUCCESS - Ignited Express Server at http://localhost:${PORT}`
        );
      });
    })
    .catch((error) => {
      console.log("ERROR: Connecting database - MongoDB", error);
      process.exit(1);
    });
} catch (error) {
  console.log(
    `ERROR - Connecting Express Server at http://localhost:${PORT}`,
    error
  );
  process.exit(1);
}
