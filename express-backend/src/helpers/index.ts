import { JWT_SECRET } from "@/constants";
import jwt from "jsonwebtoken";
export const generateAccessToken = (user: any) => {
  return jwt.sign({ user }, JWT_SECRET!, {
    expiresIn: "10m",
  });
};
