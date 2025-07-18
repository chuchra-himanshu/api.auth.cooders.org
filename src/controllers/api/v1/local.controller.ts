// Import Section
import { type Response, type Request } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../handlers";

// Controller Actions
const signup = asyncHandler(async (req: Request, res: Response) => {});
const signin = asyncHandler(async (req: Request, res: Response) => {});
const signout = asyncHandler(async (req: Request, res: Response) => {});
const forgetPassword = asyncHandler(async (req: Request, res: Response) => {});
const changePassword = asyncHandler(async (req: Request, res: Response) => {});
const changeUsername = asyncHandler(async (req: Request, res: Response) => {});

// Export Section
export default {
  signup,
  signin,
  signout,
  forgetPassword,
  changePassword,
  changeUsername,
};
