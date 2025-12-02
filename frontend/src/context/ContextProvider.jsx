import axios from 'axios';
import React ,{createContext,useContext,useEffect,useState}from 'react'
const authContext=createContext();
export const  ContextProvider = ({children}) => {
  const[user,setUser]=useState(null);
  const login=(user)=>{setUser(user);}
  useEffect(()=>{
   const verifyuser= async()=>{
   try{
      const res=await axios.get("http://localhost:3000/api/auth/verify",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      if(res.data.success){
         setUser(res.data.user)
      }
      else{setUser(null)}
   }
   catch(err){console.log(error)}
   }
   verifyuser();
  },[])
  return (
     <authContext.Provider value={{user,login}}>
        {children}
     </authContext.Provider>
  )
}
export const useAuth=()=>{  return useContext (authContext);}
export default ContextProvider;

