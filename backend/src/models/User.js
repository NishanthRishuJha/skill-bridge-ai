import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // NEW FIELDS
  skills: [String],
  profileSummary: String,
  education: String,
  experience: String,
  github: String,
  linkedin: String
});


export default mongoose.model("User", userSchema);
