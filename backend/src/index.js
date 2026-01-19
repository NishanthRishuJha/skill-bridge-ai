import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

/* ======================
   CORS CONFIG (IMPORTANT)
====================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",                 // local dev
      process.env.CLIENT_URL                  // Vercel frontend
    ],
    credentials: true,
  })
);

/* ======================
   MIDDLEWARES
====================== */
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiRoutes);

/* ======================
   TEST ROUTE
====================== */
app.get("/", (req, res) => {
  res.json({ message: "SkillBridge AI Backend Running 🚀" });
});

/* ======================
   DATABASE + SERVER
====================== */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
