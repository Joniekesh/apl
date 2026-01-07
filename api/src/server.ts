import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import connectDB from "./utils/db";
import cookieParser from "cookie-parser";
import ImageKit from "@imagekit/nodejs";

dotenv.config();

connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

app.get("/api/imagekit-auth", function (_req: Request, res: Response) {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json("Route not found");
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json(err.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
