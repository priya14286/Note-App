import React ,{createContext,useContext,useState}from 'react'
const authContext=createContext();
export const  ContextProvider = ({children}) => {
  const[user,setUser]=useState(null);
  const login=(user)=>{setUser(user);}
  const Logout=()=>{
      localStorage.removeItem('token')
      setUser(null);
    }
  return (
     <authContext.Provider value={{user,login,Logout}}>
        {children}
     </authContext.Provider>
  )
}
export const useAuth=()=>{  return useContext (authContext);}
export default ContextProvider;
