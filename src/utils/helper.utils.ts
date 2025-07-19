import { ENV_CONSTANTS } from "../constants";
import { CookieOptions } from "express";

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: ENV_CONSTANTS.NODE_ENV === "PRODUCTION",
};

export default {
  COOKIE_OPTIONS,
};
