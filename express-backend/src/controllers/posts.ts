import { JWT_ACCESS_TOKEN } from "@/constants";
import User from "@/models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const postTweet = async (req: Request, res: Response) => {
  const { tweet } = req.body;
  if (!tweet) {
    return res.status(400).json({ message: "Cannot send empty tweet" });
  }
  try {
    return res.status(200).json({ message: "Tweet posted successfully" });
  } catch (error) {
    console.error(error);
    throw Error("User Login failed : " + error);
  }
};
