import User from "@/models/User";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
};
export const signUpContrtoller = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const data = await User.create({ name: name, password: password });
    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);
    throw Error("User creation failed : " + error);
  }
};
