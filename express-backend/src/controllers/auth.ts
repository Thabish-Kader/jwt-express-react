import { JWT_SECRET } from "@/constants";
import { generateAccessToken } from "@/helpers";
import User from "@/models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, password } = req.body;

  try {
    if (!name || !password) {
      throw {
        status: 400,
        message: "All fields are required",
      };
    }
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      throw {
        status: 401,
        message: "User not found",
      };
    }

    if (user.password !== password) {
      throw {
        status: 401,
        message: "Invalid credentials",
      };
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ user }, JWT_SECRET!, { expiresIn: "1d" });

    res.status(200).json({
      message: "User logged in successfully",
      user,
      accessToken,
      refreshToken,
    });
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
  try {
    if (!name || !password) {
      throw {
        status: 400,
        message: "All fields are required",
      };
    }
    await User.create({ name: name, password: password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const tokenContoller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      throw {
        status: 403,
        message: "Verication Error",
      };
    }

    jwt.verify(refreshToken, JWT_SECRET!, (err: Error | null, user: any) => {
      if (err) throw { status: 403, message: "Verification failed" };
      const accessToken = generateAccessToken(user);
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
