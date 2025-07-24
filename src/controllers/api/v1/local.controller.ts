// Import Section
import { type Response, type Request } from "express";
import { APIError, APIResponse, asyncHandler } from "../../../handlers";
import { Token, User } from "../../../models";
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

const signin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, rememberMe } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json(APIError.send(404, "Invalid Email / Password"));
  }

  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    return res.status(404).json(APIError.send(404, "Invalid Email / Password"));
  }

  user.rememberMe = rememberMe;
  await user.save();

  const accessToken: string = await user.generateAccessToken();
  const refreshToken: string = await user.generateRefreshToken(rememberMe);
  const tokenExpirySeconds = rememberMe
    ? 7 * 24 * 60 * 60 * 1000
    : 1 * 24 * 60 * 60 * 1000;

  await Token.findOneAndUpdate(
    { user: user._id },
    {
      refreshToken: {
        code: refreshToken,
        expiry: new Date(Date.now() + tokenExpirySeconds),
      },
    }
  );

  return res
    .cookie("ACCESS_TOKEN", accessToken, HELPER_UTILITIES.COOKIE_OPTIONS)
    .cookie("REFRESH_TOKEN", refreshToken, HELPER_UTILITIES.COOKIE_OPTIONS)
    .status(200)
    .json(
      APIResponse.send(200, "User signed in successfully", {
        email: user.email,
        username: user.username,
        rememberMe: user.rememberMe,
        emailVerificationStatus: user.emailVerificationStatus,
      })
    );
});

const signout = asyncHandler(async (req: Request, res: Response) => {
  const { user_id } = req.user;

  try {
    await Token.updateOne(
      { user: user_id },
      {
        $set: {
          "refreshToken.code": "",
          "refreshToken.expiry": new Date(),
        },
      }
    );
  } catch (error) {
    return res
      .clearCookie("ACCESS_TOKEN", HELPER_UTILITIES.COOKIE_OPTIONS)
      .clearCookie("REFRESH_TOKEN", HELPER_UTILITIES.COOKIE_OPTIONS)
      .status(401)
      .json(APIError.send(401, "Un-Authorized Access Detected!"));
  }

  return res
    .clearCookie("ACCESS_TOKEN", HELPER_UTILITIES.COOKIE_OPTIONS)
    .clearCookie("REFRESH_TOKEN", HELPER_UTILITIES.COOKIE_OPTIONS)
    .status(200)
    .json(APIResponse.send(200, "User signed out successfully"));
});

const forgetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(APIError.send(404, "User not found!"));
  }

  const token = await Token.findOne({ user: user._id });
  if (!token?.forgetPasswordToken?.isAuthenticated) {
    return res.status(403).json(
      APIError.send(403, "User not verified to change password", {
        user_verification: false,
      })
    );
  }

  user.password = password;
  await user.save();

  return res
    .status(200)
    .json(APIResponse.send(200, "Password updated successfully"));
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const { password, newPassword } = req.body;

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json(APIError.send(404, "User not found!"));
  }

  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    return res
      .status(403)
      .json(APIError.send(403, "Please enter a valid current password"));
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(APIResponse.send(200, "Password updated successfully"));
});

const changeUsername = asyncHandler(async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const { username } = req.body;

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json(APIError.send(404, "User not found!"));
  }

  if (user.username === username) {
    return res
      .status(400)
      .json(
        APIError.send(
          400,
          "New username must be different from the current one"
        )
      );
  }

  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(409).json(APIError.send(409, "Username already taken"));
  }

  user.username = username;
  await user.save();

  return res
    .status(200)
    .json(APIResponse.send(200, "Username updated successfully"));
});

// Export Section
export default {
  signup,
  signin,
  signout,
  forgetPassword,
  changePassword,
  changeUsername,
};
