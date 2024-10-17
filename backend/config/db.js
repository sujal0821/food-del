import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://sujal0821:7237018226Aa@cluster0.c0h7d.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}