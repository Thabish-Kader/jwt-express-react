import { Request, Response, NextFunction } from "express";

type CustomError = Error & { status?: number };
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error: CustomError = new Error("Api Not Found");
  error.status = 404;
  next(error);
};

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
};
