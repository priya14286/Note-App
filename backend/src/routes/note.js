import express from "express";
import Note from "../models/Notemodel.js";
const router=express.Router();
import middleware from "../middleware/middleware.js";
router.post("/add", middleware,async(req,res)=>{
 try{
    const{title,content}=req.body;
    
    const newNote=new Note({
        title,
        content,
        userId:req.user.id
    });
    await newNote.save();
    return res.status(201).json({ success: true ,message:"note created successfully"});
    
}
catch(err){
   return res.status(500).json({ success: false ,message:"Error in adding note" });}});

router.get('/',middleware,async(req,res)=>{
    try{
        const notes=await Note.find({
            userId: req.user.id})
        return res.status(200).json({success:true,notes})
    }
    catch(err){
        return res.status(500).json({success:false,message:"cannt retrieve data"})
    }
})
router.put("/:id",async(req,res)=>{
    try{
        const{id}=req.params
        const updatednote= await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true,updatednote})
    }
    catch(err){
        return res.status(500).json({success:false,message:"cannt update note"})
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const{id}=req.params
        const updatednote= await Note.findByIdAndDelete(id)
        return res.status(200).json({success:true,updatednote})
    }
    catch(err){
        return res.status(500).json({success:false,message:"cannt delete note"})
    }
})
    export default router;  