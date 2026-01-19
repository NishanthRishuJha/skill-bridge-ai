import express from "express";
import Internship from "../models/Internship.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Create Internship (Recruiter)
router.post("/", auth, async (req, res) => {
  try {
    const internship = await Internship.create({
      ...req.body,
      postedBy: req.user.id
    });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Internships
router.get("/", async (req, res) => {
  const internships = await Internship.find().populate("postedBy", "name email");
  res.json(internships);
});

// Get Single Internship
router.get("/:id", async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  res.json(internship);
});

export default router;
