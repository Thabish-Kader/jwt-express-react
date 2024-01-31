import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

interface IGetUserAuthInfoRequest extends Request {
  user?: any;
}
export const JwtAuthMiddleWare = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  console.log(token);
  try {
    if (!token) {
      throw {
        status: 401,
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
