import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notecard from "../components/Notecard";
import { FaNotesMedical } from "react-icons/fa";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const [isModelopen, setIsModelopen] = useState(false);
  const[notes,setNotes]=useState([]);
  const[currentnote,setcurrentnote]=useState(null);
  const[query,setquery]=useState('');
  const[filternotes,setfilternotes]=useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    // const fetchNotes=async()=>{
    //   try{ 
    //     const {data}=await axios.get("http://localhost:3000/api/note")
    //     setNotes(data.notes)
    //   }
    //   catch (err){
    //     console.log(err)
    //   }
    // }
    fetchNotes();
  },[])

  useEffect(()=>{
    setfilternotes(
      notes.filter((note)=>note.title.toLowerCase().includes(query.toLowerCase() ) ||  note.content.toLowerCase().includes(query.toLowerCase())
    ))
  },[query,notes]);
 const fetchNotes=async()=>{
      try{ 
        const {data}=await axios.get("http://localhost:3000/api/note",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setNotes(data.notes)
      }
      catch (err){
        console.log(err)
      }
    }
  const closeModel = () => {
    setIsModelopen(false);
  };
  const onEdit=()=>{
    setcurrentnote(notes);
    setIsModelopen(true);

  }

  const addNote = async ({ title, content }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deletenote=async(id)=>{
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/note/${id}`,
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        toast.success("note deleted")
        
        
      }
    } catch (err) {
      console.log(err);
    }
  }
  const editnote=async(id,title,content)=>{
  try {
      const response = await axios.put(
        `http://localhost:3000/api/note/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <Navbar setquery={setquery}/>
      <div className=" pt-4 px-8 gap-6 grid grid-cols-1 md:grid-cols-3">{filternotes.length > 0 ? filternotes.map(note=>(
        <Notecard key={note._id}note={note} onEdit={onEdit}
        deletenote={deletenote}/>
      )):<p>no notes</p>}</div>

      <button
        onClick={() => setIsModelopen(true)}
        className="bg-teal-500 text-white text-2xl font-bold p-4 rounded-full fixed right-4 bottom-4"
      >
        +
      </button>

      {isModelopen && (
        <NoteModel closeModel={closeModel} addNote={addNote} currentnote={currentnote} editnote={editnote} 
        />
      )}
    </div>
  );

};
export default Home;
