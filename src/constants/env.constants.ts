import dotenv from "dotenv";
dotenv.config();

const ENV_CONSTANTS = {
  PORT: Number(process.env.PORT) || 3001,
};

export default ENV_CONSTANTS;
