import User from "@/models/User";
import { NextFunction, Request, Response } from "express";

export const getTweetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const DUMMY_TWEETS = [
    {
      username: "user1",
      tweet: "Just had a great time coding!",
      timestamp: new Date("2024-01-31T10:30:00"),
      likes: 20,
      retweets: 5,
    },
    {
      username: "user2",
      tweet: "More Bugs",
      timestamp: new Date("2024-01-31T11:45:00"),
      likes: 15,
      retweets: 3,
    },
    {
      username: "user3",
      tweet: "Feeling inspired today.",
      timestamp: new Date("2024-01-31T12:15:00"),
      likes: 30,
      retweets: 8,
    },
  ];
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      throw {
        status: 400,
        message: "User not found",
      };
    }
    if (user.id !== parseInt(id)) {
      throw {
        status: 400,
        message: "No, Tweets Associated with this user",
      };
    }
    res.status(200).json(DUMMY_TWEETS);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
