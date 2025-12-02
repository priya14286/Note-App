import { useState } from "react";
import { Signup } from "./pages/signup.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home  from "./pages/Home.jsx";
import  Login  from "./pages/Login.jsx";
import {ToastContainer} from  'react-toastify';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/register" element={<Signup />}></Route>
    <Route path="/login" element={<Login />}></Route>
    </Routes>
    <ToastContainer />
    </BrowserRouter>  );   
}

export default App;
