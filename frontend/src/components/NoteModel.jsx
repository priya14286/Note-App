import React, { useEffect, useState } from "react";
import axios from "axios";


const NoteModel = ({closeModel,addNote,currentnote,editnote}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(()=>{
    if(currentnote){
      setTitle(currentnote.title)
      setContent(currentnote.content)
    }
  },[currentnote])  //dsplay edited note
  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentnote){
      editnote(currentnote._id,title,content)
    }else{addNote({title,content});}
    
    // try {
    //   const response = axios.post("http://localhost:3000/api/note/add", {
    //     title,
    //     content,
    //   });
    //   if (response.data.success) {
    //     Navigate("/");
    //     //closeModel();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="flex justify-center items-center bg-gray-800 bg-opacity-75 fixed inset-0">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">{currentnote ? "edit note":"Add New Note" }</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border mb-4 p-2 w-full"
            placeholder="note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 mb-4 w-full"
            placeholder="note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button
            className="bg-blue-400 text-white py-2 px-4 rounded
          "
            type="submit"
          >
            {currentnote?"update note":"Add Note"}
          </button>
        </form>
        <button onClick={closeModel} className="text-red-700">cancel</button>
      </div>
    </div>
  );
};

export default NoteModel;
