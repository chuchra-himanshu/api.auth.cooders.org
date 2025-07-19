interface UserSchemaInterface extends Document {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
  emailVerificationStatus: boolean;
  isPasswordValid: (password: string) => Promise<boolean>;
  generateAccessToken: () => Promise<string>;
  generateRefreshToken: () => Promise<string>;
}

interface TokenSchemaInterface {
  user: ObjectId;
  refreshToken: {
    code: string;
    expiry: Date;
  };
  emailVerificationToken: {
    code: string;
    expiry: Date;
  };
  tfaToken: {
    code: string;
    expiry: Date;
  };
  forgetPasswordToken: {
    code: string;
    expiry: Date;
    isAuthenticated: boolean;
  };
}
