import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
export const signup =async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error :"Passwords dont match each other"})
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already present"});
        }
const salt=await bcrypt.genSalt(10);
const hashedPassword =await bcrypt.hash(password,salt);
       //HASH PASSWORD HERE

const boyProfilePic = `https://avatar.iran.liara.run/public/boy?${username}`;
const girlProfilePic=`https://avatar.iran.liara.run/public/girl?${username}`;

const newUser=new User({            //naya document bna diya collection me daalne ke lie
    fullName, //or it can be written as fullName :fullName;
    username,
    password :hashedPassword,
    gender,
    profilePhoto: gender === "male"?boyProfilePic:girlProfilePic
})
if(newUser){
    await newUser.save();  
   createToken(newUser._id,res);
  //Used database me store krane ke lie.

res.status(201).json({
    _id: newUser._id,
    fullName:newUser.fullName,
    userName: newUser.username,
    profilePhoto: newUser.profilePhoto,

})
}
else{
    console.log("invalid user data facing problem while saving the data into database");
    res.status(401).json({error:"invalid user data facing problem while saving the data into database"})
}
    }catch(error){
        console.log("singUp error",error);
        res.status(500).json({error:"error while receiving value in signup controller"})
    }
    


}
export const login = async(req,res)=>{
    // console.log("Login in successfull");
    // res.send("Login successfull");
    try{
        const {username,password}=req.body;
        const user= await User.findOne({username});
        const correctPass=await bcrypt.compare(password,user?.password||"");// expty string islie daali agr user exist nahi kr ra hoga to vo keh dega go sign up first

        if(!user || correctPass){
         return res.status(401).json({error:"Guess u Need to SignUp first"});
        }

        createToken(user._id,res);
        res.status("200").json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePhoto:user.profilePhoto
        })
    }
    catch(error){
        console.log("login krate samey dikkat");
        res.status(401).json({error:"issue while Login"})
    }
}
export const logout =(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge :0});
    res.status(200).json({message:"Logged out"});
   }catch(error){
    console.log("error while logout"+ error.message);
    res.status(400).json({error:"Logout Issue"});
   }
}