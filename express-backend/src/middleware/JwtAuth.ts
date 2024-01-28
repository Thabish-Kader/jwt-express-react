import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN } from "@/constants";

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

  if (!token) {
    return res.status(401).json({ message: "Verify User" });
  }

  try {
    jwt.verify(token, JWT_ACCESS_TOKEN!, (err, user) => {
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
