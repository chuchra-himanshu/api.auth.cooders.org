interface UserSchemaInterface {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
  emailVerificationStatus: boolean;
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
