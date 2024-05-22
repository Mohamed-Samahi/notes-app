import React from "react";

import { UserAuth } from "../context/UserContext";
import Button from "./Button";

const NoteDetails = ({ modalData, setOpenEditModal }) => {

  const { noteId, noteTitle, noteContent } = modalData;

  const { handleUpdateNote } = UserAuth();

  const updateNote = async (e) => {
    e.preventDefault();

    const updatedTitle = e.target[0].value;
    const updatedContent = e.target[1].value;

    try {
      await handleUpdateNote(noteId, updatedTitle, updatedContent);

      setOpenEditModal(prev => false)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <div>
        <div
          onClick={() => setOpenEditModal(prev => false)}
          className="fixed top-0 left-0 w-screen h-screen bg-black cursor-pointer bg-opacity-70"
        />
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-43%] p-4 rounded-lg bg-white border border-yellow-3000 z-[1000] w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[45%] 2xl:w-[35%] m-auto">
          <form onSubmit={updateNote}>
            <input
              type="text"
              name="noteTitle"
              id="noteTitle"
              autoComplete="off"
              placeholder="Note Header"
              className="w-full p-4 mb-4 font-bold border rounded-xl border-yellow-3000 focus:outline-none focus:border-slate-500"
              defaultValue={noteTitle}
            />
            <textarea
              name="noteContent"
              id="noteContent"
              placeholder="Your note goes here..."
              className="mb-2 p-4 resize-none rounded-xl border border-yellow-3000 focus:outline-none focus:border-slate-500 w-full h-[200px] sm:h-[377px] text-sm"
              defaultValue={noteContent}
            />
            <Button>Apply</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;