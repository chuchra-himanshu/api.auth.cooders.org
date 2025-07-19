// Import Section
import { type Response, type Request } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../handlers";
import { User } from "../../../models";

// Controller Actions
const signup = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, rememberMe } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  }).lean();

  if (existingUser) {
    const isEmailTaken = existingUser.email === email;
    const message = isEmailTaken
      ? "Email already exists, Please Sign-In"
      : "Username already exists, Please choose another";

    return res.status(409).json(APIError.send(409, message));
  }

  await User.create({
    email,
    username,
    password,
    rememberMe,
  });

  return res
    .status(201)
    .json(APIResponse.send(201, "User registered successfully"));
});

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
