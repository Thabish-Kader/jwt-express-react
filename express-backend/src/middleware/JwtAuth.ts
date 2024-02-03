import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

interface IGetUserAuthInfoRequest extends Request {
  user?: string | jwt.JwtPayload | undefined;
}
export const JwtAuthMiddleWare = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  try {
    if (!token) {
      throw {
        status: 403,
        message: "User not authorized",
      };
    }

    jwt.verify(token, JWT_SECRET!, (err, user) => {
      if (err) throw { status: 403, message: "Verification failed" };
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
