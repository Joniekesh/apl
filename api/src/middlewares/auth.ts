import jwt from "jsonwebtoken";
import User from "../models/User";
import { NextFunction, Request, Response } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_JWT as string
    ) as { id: string };

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json("User not found.");
    }

    req.user = user;
    next();
  } catch {
    return res.status(403).json("Token is not valid!");
  }
};

export const requireRole =
  (...roles: Array<"admin" | "staff" | "user">) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json("Authentication required.");
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json("Access denied. You are not allowed to perform this action.");
    }

    next();
  };
