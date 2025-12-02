import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Notecard = ({note,onEdit,deletenote}) => {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-bold'>{note.title}</h2>
      <p>{note.content}</p>
      <div className='flex justify-end mt-2'>
        <button className='text-blue-500 mr-2' onClick={()=>onEdit(note)}><FaEdit /></button>
        <button className='text-red-500' onClick={()=>
          deletenote(note._id)}>
          <FaTrash /></button>
      </div>
    </div>
  )
}

export default Notecard