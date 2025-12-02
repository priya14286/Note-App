import React,{useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios
  from "axios";
  import { useAuth } from "../context/ContextProvider";
const Login = () => {

  
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate =useNavigate();
  const {login}=useAuth();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
   const response= await axios.post("http://localhost:3000/api/auth/login",{email,password}) //data register route  me bhej rhe h
   console.log(response.data);
  console.log(response.data.user);
if(response.data.success){
  login(response.data.user);
  localStorage.setItem("token",response.data.token);
  navigate('/');
}} //response.data me backend ka actual answer aata hai
    catch(err){
      console.log(err);
    }
   
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className=" border shadow  p-8 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-gray-900" htmlFor="email">
              Email
            </label>
            <input
              className="border px-2 py-2 w-full"
              type="email"
               value={email}
              placeholder="enter email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900" htmlFor="password">
              Password
            </label>
            <input
              className="border px-2 py-2 w-full"
              type="password"
               value={password}
              placeholder="enter password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="border w-full p-2 bg-green-600" type="submit">
            Login
          </button>
          <p className="text-center">
            Don't Have An Account ? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;