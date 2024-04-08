import React, { useState } from "react";
import Button from "../components/Button";
import NotesList from "../components/NotesList";

import { UserAuth } from "../context/UserContext";
console.log("test from user notes");

const UserNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user, addNote } = UserAuth();

  const titleInputHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentInputHandler = (e) => {
    setContent(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (user?.email) {
      if (title === "" && content === "") {
        return;
      }

      const id = crypto.randomUUID();

      const noteTitle = title;
      const noteContent = content;
      setTitle("");
      setContent("");
      await addNote(`${user?.email}`, id, noteTitle, noteContent);
    } else {
      alert("please log in to add a note");
    }
  };

  return (
    <div className="flex items-center justify-center h-full mx-auto max-w-7xl">
      <div className="overflow-hidden flex flex-col sm:flex-row items-center justify-around p-4 bg-white rounded-3xl w-full max-w-[90rem] my-4 mx-auto ">
        <div className="sm:w-[40%] mb-[20px] sm:m-0">
          <h1 className="p-3 pl-0 text-xl font-bold">Add to your list!</h1>
          <form onSubmit={submitHandler} action="">
            <input
              type="text"
              name="noteTitle"
              id="noteTitle"
              autoComplete="off"
              placeholder="Note Header"
              className="w-full p-4 mb-4 font-bold border rounded-xl border-slate-300 focus:outline-none focus:border-slate-500"
              value={title}
              onChange={titleInputHandler}
            />
            <textarea
              name="noteContent"
              id="noteContent"
              placeholder="Your note goes here..."
              className="mb-2 p-4 resize-none rounded-xl border border-slate-300 focus:outline-none focus:border-slate-500 w-full h-[200px] sm:h-[377px] text-sm"
              value={content}
              onChange={contentInputHandler}
            />
            <Button>Add Note</Button>
          </form>
        </div>
        <div className="mb-[20px] sm:m-0 h-[2px] sm:h-[574px] w-full sm:w-[2px] bg-[#3fa4af]">
          <span className="block w-[5px] rotate-180 sm:rotate-90 border-[20px] border-b-[#3fa4af] relative left-[50%] sm:left-[20px] top-0 sm:top-[50%] translate-x-[-50%] sm:translate-y-[-50%] border-r-transparent border-t-transparent border-l-transparent"></span>
        </div>
        <div className="w-full sm:w-[45%]">
          <NotesList />
        </div>
      </div>
    </div>
  );
};

export default UserNotes;
