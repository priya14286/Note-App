import express from 'express';
const router=express.Router();
import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/middleware.js';

router.post('/register', async (req,res)=>{
    console.log("🔥 Request hit hua");
  console.log("Body:", req.body);
  
  try{
    const{name,email,password}=req.body;
    const existuser=await User.findOne({email});
    if(existuser){
        return res.status(400).json({ success: false ,message:"User already exists"});
    }
    const hashpassword=await bcrypt.hash(password,10);
    const newUser=new User({
        name,
        email,          password:hashpassword
    });
    await newUser.save();
    return res.status(201).json({ success: true ,message:"User registered successfully"});
    
}
catch(err){
   return res.status(500).json({ success: false ,message:"adding user Error" });
}})
router.post('/login', async (req,res)=>{
    console.log("🔥 Request hit hua");
  console.log("Body:", req.body);
  
  try{
    const{email,password}=req.body;
    const existuser=await User.findOne({email});
    if(!existuser){
        return res.status(401).json({ success: false ,message:"User not exists"});
    }
    const checkpassword=await bcrypt.compare(password,existuser.password);
    if(!checkpassword){
        return res.status(401).json({ success: false ,message:"Invalid credentials"});
    }
    const token=jwt.sign({id:existuser._id},"secretkeynoteapp123@",{expiresIn:'10d'});       
    
    return res.status(201).json({ success: true , token,
        user:{name:existuser.name},message:"User logged in successfully"});
    
}
catch(err){
   return res.status(500).json({ success: false ,message:" error in login Server " });
}})

router.get("/verify",middleware,async(req,res)=>{
    return res.status(200).json({success:true,User:req.user})
})
export default router;