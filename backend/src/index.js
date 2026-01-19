import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";


import authRoutes from "./routes/authRoutes.js";

import internshipRoute from "./routes/internshipRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js"
import profileRoutes from "./routes/profileRoutes.js";

// import profileRoutes from "./routes/profileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoute);
app.use("/api/ai",aiRoutes)
app.use("/api/profile", profileRoutes);
//app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "SkillBridge AI Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.log(err));
