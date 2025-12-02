import express from 'express';
const app=express();
import authRoutes from './routes/auth.js';
import cors from 'cors';
import connectDB from './config/db.js';
import noteRoutes from './routes/note.js';
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',authRoutes);
app.use('/api/note',noteRoutes);
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});