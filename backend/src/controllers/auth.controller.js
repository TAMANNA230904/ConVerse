import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup=async(req,res)=>{
    console.log("Signup route hit with data:", req.body);
    const {fullName,email,password}=req.body;

   try {
      // hash passwords   
      console.log("Checking if user exists in DB...");  
      const user=await User.findOne({email})
      if(user){ 
      console.log("User already exists");
      return res. status(400).json({
          message:"User already exists"
      })
    }

    console.log("Hashing password...");
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    console.log("Creating new user...");

    const newUser=new User({
        fullName:fullName,
        email:email,
        password:hashedPassword
    })

    if(newUser){
        //generate jwt token
        generateToken(newUser._id,res)
        await newUser.save();  //save the new user to the database
        res.status(201).json({
           _id:newUser._id,
           fullName:newUser.fullName,
           email:newUser.email,
           profilePic:newUser.profilePic
          }
        )
    }else{
        res.status(400).json({message:"Invalid credentials"})
    }

}
    
    catch (error) {
          console.log("Error in signup controller",error.message)
          res.status(500).json({message:"Error signing Up"})
   }
}

export const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
        return res.status(400).json({message:"Invalid credentials"})
        }
        const isPasswordCorrect= await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email,
            profilePic:user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;
        console.log(profilePic,userId);
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"})
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic)
        if(!uploadResponse){
            return res.status(500).json({message:"Error uploading image"})
        }
        const updatedUser=await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true})
        if(!updatedUser){
            return res.status(500).json({message:"Error updating profile"})
        }
        console.log("Updated user",updatedUser);
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile",error);
        res.status(500).json({message:"Internal server error in update profile"})
    }
}

export const checkAuth=async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}