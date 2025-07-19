// Import Section
import { type Response, type Request } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../handlers";
import { Token, User } from "../../../models";
import { ENV_CONSTANTS } from "../../../constants";
import { HELPER_UTILITIES } from "../../../utils";

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

  const user = await User.create({
    email,
    username,
    password,
    rememberMe,
  });

  const accessToken: string = await user.generateAccessToken();
  const refreshToken: string = await user.generateRefreshToken(rememberMe);
  const tokenExpirySeconds = rememberMe
    ? 7 * 24 * 60 * 60 * 1000
    : 1 * 24 * 60 * 60 * 1000;

  await Token.create({
    user: user._id,
    refreshToken: {
      code: refreshToken,
      expiry: new Date(Date.now() + tokenExpirySeconds),
    },
  });

  return res
    .cookie("ACCESS_TOKEN", accessToken, HELPER_UTILITIES.COOKIE_OPTIONS)
    .cookie("REFRESH_TOKEN", refreshToken, HELPER_UTILITIES.COOKIE_OPTIONS)
    .status(201)
    .json(
      APIResponse.send(201, "User registered successfully", {
        email: user.email,
        username: user.username,
        rememberMe: user.rememberMe,
        emailVerificationStatus: user.emailVerificationStatus,
      })
    );
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
