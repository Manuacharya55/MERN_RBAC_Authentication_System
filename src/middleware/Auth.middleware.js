import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.Model.js";

export const verifyuser = AsyncHandler(async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.header("token")
    if(!token){
        throw new ApiError(401,"Un-Authorised")
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded?._id);

    if(!user){
        throw new ApiError(401,"Not a valid token")
    }

    req.user = user;
    next()
})

export const verifyAdmin = AsyncHandler(async(req,res,next)=>{
    const user = req.user;

    if(user.role !== "admin"){
        throw new ApiError(401,"Un-Authorized access")
    }
    next();
})