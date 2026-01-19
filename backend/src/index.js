import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (VERY IMPORTANT)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "SkillBridge AI Backend Running 🚀" });
});

// ✅ START SERVER FIRST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ THEN CONNECT DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));
