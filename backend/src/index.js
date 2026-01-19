import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/authRoutes.js";
import internshipRoute from "./routes/internshipRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

/* ============================
   ✅ CORS CONFIG (FINAL FIX)
============================ */
const allowedOrigins = [
  "http://localhost:5173",
  "https://skill-bridge-ai-ebon.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 REQUIRED for preflight
app.options("*", cors());

/* ============================
   Middlewares
============================ */
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/* ============================
   Routes
============================ */
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiRoutes);

/* ============================
   Test Route
============================ */
app.get("/", (req, res) => {
  res.json({ message: "SkillBridge AI Backend Running 🚀" });
});

/* ============================
   Server + DB
============================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
