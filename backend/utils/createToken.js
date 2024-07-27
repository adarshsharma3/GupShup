import jwt from "jsonwebtoken";

const createToken=(userId,res)=>{
    const token= jwt.sign({userId},process.env.SECRET,{ //userId as payload 
expiresIn: "20d"
    });
res.cookie("jwt",token,{},{
maxAge: 20*24*60*60*1000,
httpOnly:true,
sameSite:"strict",
secure: process.env.WHERE !=="pratice" // http https
})
}

export default createToken;