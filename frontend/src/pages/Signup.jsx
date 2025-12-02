import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios
  from "axios";
export const Signup = () => {

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate =useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
   const response= await axios.post("http://localhost:3000/api/auth/register",{name,email,password}) //data register route  me bhej rhe h
   console.log(response.data);
  console.log(response.data.user);
if(response.data.success){
  navigate('/login');}} //response.data me backend ka actual answer aata hai
    catch(err){
      console.log(err);
    }
   
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className=" border shadow  p-8 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-900" htmlFor="name">
              Name
            </label>
            <input
              className="border px-2 py-2 w-full"
              type="text"
               value={name}
              placeholder="enter name"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
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
            Sign Up
          </button>
          <p className="text-center">
            Already Have Account ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
