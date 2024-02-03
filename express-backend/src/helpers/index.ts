import { JWT_SECRET } from "@/constants";
import User from "@/models/User";
import jwt from "jsonwebtoken";
export const generateAccessToken = (user: User) => {
  // return jwt.sign({ user: user.name }, JWT_SECRET!, {
  //   expiresIn: "20s",
  // });
  return jwt.sign({ user }, JWT_SECRET!, { expiresIn: "20s" });
};
