import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isverified:{
        type:Boolean,
        default:false
    },
    resetPasswordtoken:String,
    resetPasswordexpiresat:Date,
    verificationtoken:String,
    verificationtokenexpieresat:Date,

},{timestamps:true})


export const User= mongoose.model("User",userSchema)