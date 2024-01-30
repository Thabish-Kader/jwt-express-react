import { JWT_SECRET } from "@/constants";
import User from "@/models/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const generateAccessToken = (user: any) => {
  return jwt.sign({ user }, JWT_SECRET!, {
    expiresIn: "15s",
  });
};

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
    const refreshToken = jwt.sign({ user }, JWT_SECRET!);

    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user,
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
    const data = await User.create({ name: name, password: password });
    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const tokenContoller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { jwt: refreshToken } = req.cookies;

  try {
    if (!refreshToken) {
      throw {
        status: 403,
        message: "Verication Error",
      };
    }

    jwt.verify(refreshToken, JWT_SECRET!, (err: Error | null, user: any) => {
      if (err) throw { status: 403, message: "Verification failed" };
      const accessToken = generateAccessToken({ user: user.name });
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
