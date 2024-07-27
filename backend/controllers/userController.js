import User from "../models/userModel.js";

export const getUserSidebar= async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUser=await User.find({_id:{$ne: loggedInUserId}}).select("-password"); 
        res.status(201).json(filteredUser);
    }catch(error){
        console.log("Issue in userController");
        res.status(500).json({error:"INternal user error"});
    }
};