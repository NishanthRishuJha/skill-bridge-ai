import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;

    const hashed = await bcrypt.hash(password,10);

    const user = await User.create({name,email,password:hashed,role});

    res.json({message:"Registered", user});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  res.status(201).json({ message: "User registered" });
});


export default router;
