import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  userId: String,
  internshipId: String,
  score: Number,
  reasons: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Match", matchSchema);
