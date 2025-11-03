import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Connected")
    }catch(error){
        console.log("Error Ocurred : ",error.message)
    }
}