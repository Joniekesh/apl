import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json(
        "First Name, Last Name, Email and Password are required to create a user!"
      );
  }
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json("A user with the email already exist");
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  const createdUser = await newUser.save();

  if (!createdUser) {
    return res.status(400).json("User not created. Please try again!");
  }
  return res.status(201).json(createdUser);
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email, deletedAt: null });

  if (!user) {
    return res.status(400).json("Invalid credentials!");
  }

  if (user?.role !== "admin" && user?.role !== "staff") {
    return res.status(400).json("Unauthorized!");
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).json("Invalid credentials.");
  }

  const { password, ...userInfo } = user.toJSON();

  const token = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_JWT as string
  );

  return res
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 14 * 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json(userInfo);
};

export const logout = async (_req: Request, res: Response) => {
  const data = res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: false,
  });

  if (!data) {
    return res.status(400).json("Error logging in");
  }

  return res.status(200).json("Logged out successfully");
};
