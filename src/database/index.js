import mongoose from "mongoose";

export const connectDB = async()=>{
    console.log(process.env.MONGO_URL,"hiii")
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Connected")
    }catch(error){
        console.log("Error Ocurred : ",error.message)
    }
}