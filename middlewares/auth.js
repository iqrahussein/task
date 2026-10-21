import jwt from "jsonwebtoken"
import User from "../model/user.js"

export const protect =async(req,res,next)=>{
  const token =req.headers.authorization.split(" ")[1];

  
  if(!token) return res.status(401).json({message:"no token profided"})
    try{
  const decoded=jwt.verify(token,process.env.JWT_SECRET);
  console.log(decoded)
  req.user=await User.findById(decoded.id).select('-password');
  next();
  }catch(err){
  res.status(401).json({message:"invalid or expired token"})
  }
    
}