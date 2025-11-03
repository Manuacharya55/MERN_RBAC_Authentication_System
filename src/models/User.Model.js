import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        min:[2,"name length should be greator than 2"],
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true,
        min:[6,"password should be greator than 6"],
        select:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    refreshToken:{
        type:String,
        select:false
    },
}, { timestamps: true }) 


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.accessToken_refreshToken = async function(){
    const refreshToken = jwt.sign({
        _id : this._id,
        email : this.email,
        role : this.role
    },process.env.JWT_SECRET)

    const accessToken = jwt.sign({
        _id : this._id,
        email : this.email,
        role : this.role
    },process.env.JWT_SECRET,{ expiresIn: '2m' })
    return {refreshToken,accessToken}
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password)
}

const User = model("User",userSchema);
export default User