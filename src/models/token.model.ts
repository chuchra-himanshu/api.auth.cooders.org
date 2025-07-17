// Import Section
import mongoose from "mongoose";

// Schema Section
const tokenSchema = new mongoose.Schema<TokenSchemaInterface>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    refreshToken: {
      code: String,
      expiry: Date,
    },
    emailVerificationToken: {
      code: String,
      expiry: Date,
    },
    tfaToken: {
      code: String,
      expiry: Date,
    },
    forgetPasswordToken: {
      code: String,
      expiry: Date,
      isAuthenticated: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// Export Section
const Token = mongoose.model<TokenSchemaInterface>("Token", tokenSchema);
export default Token;
