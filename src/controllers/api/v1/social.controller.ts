// Import Section
import { type Response, type Request } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../handlers";

// Controller Actions
const googleOAuth = asyncHandler(async (req: Request, res: Response) => {});
const googleOAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {}
);
const githubOAuth = asyncHandler(async (req: Request, res: Response) => {});
const githubOAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {}
);
const linkedInOAuth = asyncHandler(async (req: Request, res: Response) => {});
const linkedInOAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {}
);

// Export Section
export default {
  googleOAuth,
  googleOAuthCallback,
  githubOAuth,
  githubOAuthCallback,
  linkedInOAuth,
  linkedInOAuthCallback,
};
