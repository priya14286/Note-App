import React from 'react'
import {Link} from "react-router-dom";
import { useAuth } from "../context/ContextProvider";


const Navbar = ({setquery}) => {
  const { 
    user,Logout } = useAuth();
    // const handleLogout=()=>{
    //   localStorage.removeItem('token')
    // }
  return (
    <nav className='flex justify-between items-center p-4 text-white bg-gray-800'>
      <div className='font-bold text-xl'><Link to='/'> NoteApp</Link></div>
      <form>
        <input className='bg-gray-600 py-2 px-4 rounded'type="text" placeholder='Search notes..' onChange={(e)=>setquery(e.target.value)}/>
      </form>
      <div>
        
        {!user ?(<> <Link className='mr-4 px-4 py-2 bg-blue-500 rounded' to='/login'>Login</Link>
        <Link  className='mr-4 px-4 py-2 bg-green-500 rounded' to='/register'>Signup</Link> </>):(<> 
      <span className='mr-4'>{user?.name || user?.email || "User"}</span>

        <button className='mr-4 px-4 py-2 bg-red-500 rounded' onClick={Logout}>Logout</button></>)}
        
      </div>

    </nav>
  )
}

export default Navbar