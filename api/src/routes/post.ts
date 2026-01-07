import express from "express";
import {
  createPost,
  deletetePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post";
import { requireRole, verifyToken } from "../middlewares/auth";

const router = express.Router();
router.post("/", verifyToken, requireRole("admin", "staff"), createPost);
router.get("/", getPosts);
router.get("/find/:id", getPost);
router.put("/:id", verifyToken, requireRole("admin", "staff"), updatePost);
router.delete("/:id", verifyToken, requireRole("admin"), deletetePost);

export default router;
