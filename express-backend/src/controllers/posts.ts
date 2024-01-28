import { NextFunction, Request, Response } from "express";

export const postTweet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { tweet } = req.body;
  try {
    if (!tweet) {
      throw {
        status: 400,
        message: "Cannot send empty tweet",
      };
    }
    return res.status(200).json({ message: "Tweet posted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
