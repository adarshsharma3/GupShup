import { createContext,useState,useContext } from "react";

export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
    // for accessing the stats stored in our context this helps us to get the values from provider
}

export const AuthContextProvider =({children})=>{
    const [authUser,setAuthuser] =useState(JSON.parse(localStorage.getItem("DemonChatUser")||null))

    return <AuthContext.Provider value={{authUser,setAuthuser}}>  
    {/* // these are the values that we want children can access */}
        {children}
    </AuthContext.Provider>
}
