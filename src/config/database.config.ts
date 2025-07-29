import mongoose from "mongoose";
import { ENV_CONSTANTS } from "../constants";

async function connectToDatabase() {
  if (!ENV_CONSTANTS.MONGODB_URI) {
    console.log("ERROR: MongoDB connection string is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(ENV_CONSTANTS.MONGODB_URI);
    console.log(`SUCCESS: MongoDB Connected Successfully`);
  } catch (error) {
    console.log("ERROR: Connecting database - MongoDB", error);
    process.exit(1);
  }
}

export default connectToDatabase;
