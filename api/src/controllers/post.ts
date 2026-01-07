import Post from "../models/Post";
import { Request, Response } from "express";
import { slugify } from "../utils/slugify";

// Admin Only
export const createPost = async (req: Request, res: Response) => {
  const { title, description, image, isPublished } = req.body;
  if (!title || !description || !image) {
    return res
      .status(400)
      .json("Post title, image and description are required");
  }

  const slug = slugify(title);

  const newPost = new Post({
    user: req.user?._id,
    title,
    description,
    slug,
    image,
    isPublished,
  });

  const createdPost = await newPost.save();

  if (!createdPost) {
    return res.status(400).json("User not created. Please try again!");
  }
  return res.status(201).json(createdPost);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate("user");
  if (!post) {
    return res.status(400).json("Post not found");
  }

  return res.status(200).json(post);
};

export const getPosts = async (_req: Request, res: Response) => {
  const posts = await Post.find({}).populate("user").sort({ createdAt: -1 });
  if (posts.length === 0) {
    return res.status(400).json("Posts not found");
  }

  return res.status(200).json(posts);
};

// Admin Only
export const updatePost = async (req: Request, res: Response) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).populate("user");
  if (!updatedPost) {
    return res.status(400).json("Post not updated. Please try again");
  }

  return res.status(200).json(updatedPost);
};

// Admin Only
export const deletetePost = async (req: Request, res: Response) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  if (!deletedPost) {
    return res.status(400).json("Post not deleted. Please try again");
  }

  return res.status(200).json("Post deleted");
};
