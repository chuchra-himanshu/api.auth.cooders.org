import dotenv from "dotenv";
dotenv.config();

const ENV_CONSTANTS = {
  PORT: Number(process.env.PORT) || 3001,
  JWT_ACCESS_TOKEN_SECRET: String(process.env.JWT_ACCESS_TOKEN_SECRET),
  JWT_REFRESH_TOKEN_SECRET: String(process.env.JWT_REFRESH_TOKEN_SECRET),
};

export default ENV_CONSTANTS;
