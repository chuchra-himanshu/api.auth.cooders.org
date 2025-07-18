// Import Section
import { type Response, type Request } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../handlers";

// Controller Actions
const generateForgetPasswordToken = asyncHandler(
  async (req: Request, res: Response) => {}
);
const verifyForgetPasswordToken = asyncHandler(
  async (req: Request, res: Response) => {}
);
const generateEmailVerificationToken = asyncHandler(
  async (req: Request, res: Response) => {}
);
const verifyEmailVerificationToken = asyncHandler(
  async (req: Request, res: Response) => {}
);
const generateTFAToken = asyncHandler(
  async (req: Request, res: Response) => {}
);
const verifyTFAToken = asyncHandler(async (req: Request, res: Response) => {});

// Export Section
export default {
  generateForgetPasswordToken,
  verifyForgetPasswordToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generateTFAToken,
  verifyTFAToken,
};
