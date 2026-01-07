import express from "express";
import { login, logout, register } from "../controllers/auth";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
