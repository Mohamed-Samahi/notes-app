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

      await addNote(`${user?.email}`, id, title, content);
    } else {
      alert("please log in to add a note");
    }

    setTitle("");
    setContent("");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="overflow-hidden flex flex-col sm:flex-row items-center justify-around p-4  bg-white rounded-lg h-fit w-[98%] max-w-[90rem] my-4 mx-auto ">
        <div className="sm:w-[40%] mb-[20px] sm:m-0">
          <h1 className="p-3 pl-0 font-bold text-xl">Add to your list!</h1>
          <form onSubmit={submitHandler} action="">
            <input
              type="text"
              name="noteTitle"
              id="noteTitle"
              autoComplete="off"
              placeholder="Note Header"
              className="font-bold mb-4 p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-slate-500 w-full"
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
        <div className="mb-[20px] sm:m-0 h-[2px] sm:h-[574px] w-full sm:w-[2px] bg-yellow-300">
          <span className="block w-[5px] rotate-180 sm:rotate-90 border-[20px] border-b-yellow-300 relative left-[50%] sm:left-[20px] top-0 sm:top-[50%] translate-x-[-50%] sm:translate-y-[-50%] border-r-transparent border-t-transparent border-l-transparent"></span>
        </div>
        <div className="w-full sm:w-[45%]">
          <NotesList />
        </div>
      </div>
    </div>
  );
};

export default UserNotes;
