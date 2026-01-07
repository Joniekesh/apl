import type { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import { AuthRequest } from "../types/express";

export const getProfile: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;

  const user = await User.findById(authReq.user._id);

  if (!user) {
    return res.status(404).json("User not found");
  }

  return res.status(200).json(user);
};

// Admin Only
export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  if (users.length === 0) {
    return res.status(404).json("Users not found");
  }

  return res.status(200).json(users);
};

// Admin Only
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json("User not found");
  }

  return res.status(200).json(user);
};

// Admin Only
export const updateUser = async (req: Request, res: Response) => {
  const updateduser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updateduser) {
    return res.status(400).json("Error updating this user. please try again.");
  }

  return res.status(200).json(updateduser);
};

// Admin Only
export const deleteUser = async (req: Request, res: Response) => {
  const deletedUser = await User.findOneAndUpdate(
    { _id: req.params.id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  );

  if (!deletedUser) {
    return res
      .status(404)
      .json({ message: "User not found or already deleted" });
  }

  return res.status(200).json({ message: "User successfully deleted!" });
};

// Admin Only
export const createUser = async (req: Request, res: Response) => {
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
    role: "staff",
    password,
  });

  const createdUser = await newUser.save();

  if (!createdUser) {
    return res.status(400).json("User not created. Please try again!");
  }
  return res.status(201).json(createdUser);
};
