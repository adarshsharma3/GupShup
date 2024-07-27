import React from 'react'
import { useState } from 'react';
import { useAuthContext } from "../Context/AuthContext";
import toast from 'react-hot-toast';
 
const useLogin = () => {
    const[loading,setLoading]=useState(false);
    const {setAuthuser}=useAuthContext();
    
    const login=async(username,password)=>{
        const success=InputErrors(username,
            password,
            );
            if(!success) return  toast.error("Enter all the Fields");
     setLoading(true)
     try{
        const res= await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({username,password})

        })
        const data= await res.json()
        if(data.error){
            throw new Error(data.error)
        }
        console.log(data,"agya");
        localStorage.setItem("DemonChatUser",JSON.stringify(data));
        setAuthuser(data);
       
     }catch(error){
        toast.error(error.message)
     }finally{
        setLoading(false)
     }
     
    };
    return {loading,login};
};

export default useLogin;

function InputErrors(
    username,
    password,
    ){
        if(!username||
            !password){
                toast.error("Enter all the Fields");
                return false;
            }
          
            return true;
    }