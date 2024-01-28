import { JWT_ACCESS_TOKEN } from "@/constants";
import User from "@/models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ user }, JWT_ACCESS_TOKEN!);

    res
      .status(200)
      .json({ message: "User logged in successfully", user, accessToken });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const signUpContrtoller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const data = await User.create({ name: name, password: password });
    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
