// Import Section
import mongoose from "mongoose";

// Schema Section
const userSchema = new mongoose.Schema<UserSchemaInterface>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    rememberMe: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailVerificationStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export Section
const User = mongoose.model<UserSchemaInterface>("User", userSchema);
export default User;
