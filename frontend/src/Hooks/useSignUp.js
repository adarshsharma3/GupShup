import React  from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext.jsx';
const useSignUp = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthuser}=useAuthContext();
  const signup=async({fullName,
    username,
    password,
    confirmPassword,
    gender})=>{
        const success=InputErrors({fullName,
            username,
            password,
            confirmPassword,
            gender});
            if(!success) return;

            setLoading(true);
try{
const res= await fetch("/api/auth/signup",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({fullName,username,password,confirmPassword,gender}), // to convert into json.
})
const data=await res.json();
console.log(data);
if(data.error){
    throw new Error(data.error);
}

localStorage.setItem("DemonChatUser",JSON.stringify(data))
// context
setAuthuser(data);   // sent the values got to that context variable
}catch(error){
    toast.error(error.message);
} finally{
    setLoading(false);
}

    };
    return {loading ,signup}
};

export default useSignUp



function InputErrors({fullName,
    username,
    password,
    confirmPassword,
    gender}){
        if(!fullName||
            !username||
            !password||
            !confirmPassword||
            !gender){
                toast.error("Enter all the Fields");
                return false;
            }
            if(password!==confirmPassword){
                toast.error("Password is not equal to ConfirmPassword");
                return false;
            }
            if(password.length<6){
                toast.error("Password must me of atleast 6 length");
                return false;
            }
            return true;
    }