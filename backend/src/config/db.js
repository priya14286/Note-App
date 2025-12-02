import mongoose from 'mongoose';
const connectDB=async()=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/noteapp");
    console.log("MongoDB connected");}
  catch(err){
    console.log("MongoDB connection error:",err);
  }
}
export default connectDB;