// Import Section
import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcryptjs";

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

// Hooks Section
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

// Methods Section
userSchema.methods.isPasswordValid = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Export Section
const User = mongoose.model<UserSchemaInterface>("User", userSchema);
export default User;
