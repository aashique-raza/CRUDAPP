import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const userModel=mongoose.model('User',userSchema);

export default userModel;