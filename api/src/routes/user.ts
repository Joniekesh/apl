import express from "express";
import {
  createUser,
  deleteUser,
  getProfile,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user";
import { requireRole, verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/me",
  verifyToken,
  requireRole("admin", "staff", "user"),
  getProfile
);
router.post("/create", verifyToken, requireRole("admin"), createUser);
router.get("/", verifyToken, requireRole("admin", "staff"), getUsers);
router.get("/find/:id", verifyToken, requireRole("admin", "staff"), getUser);
router.put("/:id", verifyToken, requireRole("admin"), updateUser);
router.put("/delete/:id", verifyToken, requireRole("admin"), deleteUser);

export default router;
