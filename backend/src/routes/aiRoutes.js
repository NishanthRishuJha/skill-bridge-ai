// import express from "express";
// import auth from "../middlewares/auth.js";
// import User from "../models/User.js";
// import Internship from "../models/Internship.js";
// import { getMatchScore } from "../services/aiServices.js";
// import Match from "../models/Match.js";

// const router = express.Router();

// router.post("/match", auth, async (req,res)=>{
//   try{
//     const { internshipId } = req.body;

//     const student = await User.findById(req.user.id);
//     const job = await Internship.findById(internshipId);

//     const result = await getMatchScore(student, job);

//     res.json(result);
//     console.log("api key:",process.env.AI_API_KEY);
//   }
  
//   catch(err){
//   console.log("AI MATCH ERROR:", err);
//   res.status(500).json({ error: err.message });
// }
// });


// export default router;





import express from "express";
import auth from "../middlewares/auth.js";
import Internship from "../models/Internship.js";
import User from "../models/User.js";
import Match from "../models/Match.js";
import { getMatchScore, getCoverLetter } from "../services/aiServices.js";

const router = express.Router();

router.post("/match", auth, async(req,res)=>{
  try{
    const { internshipId } = req.body;

    const student = await User.findById(req.user.id);
    const job = await Internship.findById(internshipId);

    const result = await getMatchScore(student,job);

    await Match.create({
      userId:req.user.id,
      internshipId,
      score:result.score,
      reasons:result.reasons
    });

    res.json(result);
  }
  catch(err){
    console.log("AI MATCH ERROR:", err);
    res.status(500).json({error:err.message});
  }
});

router.get("/history", auth, async(req,res)=>{
  const history = await Match.find({userId:req.user.id}).sort({createdAt:-1});
  res.json(history);
});

router.post("/coverletter", auth, async(req,res)=>{
  try{
    const { internshipId } = req.body;

    const student = await User.findById(req.user.id);
    const job = await Internship.findById(internshipId);

    const letter = await getCoverLetter(student,job);

    res.json({letter});
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});

export default router;
