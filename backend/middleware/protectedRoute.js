import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
 const protectedRoute=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
 
        if(!token){
            return res.status(400).json({error:"Invalid token"});
        }
        const decoded=jwt.verify(token,process.env.SECRET);
        if(!decoded){
            return res.status(401).json({error:"issue while decoding your token"});
        }
        const user =await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({error:"Invalid User"});
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log("issue in protected route",error);
        return res.status(400).json({error:"protected Route Error"});
    }
}

export default protectedRoute;