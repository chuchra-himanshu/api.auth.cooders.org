import { Request, Response, NextFunction } from "express";

function asyncHandler(
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.log(`ERROR: ${req.method} ${req.originalUrl}:\n`, error);
      next(error);
    }
  };
}

export default asyncHandler;
