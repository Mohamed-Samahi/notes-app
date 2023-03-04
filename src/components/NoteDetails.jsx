import React, { useEffect, useState } from "react";

import { UserAuth } from "../context/UserContext";
import Button from "./Button";

const NoteDetails = ({ titleData, contentData, idData, setEdit }) => {
  // const data = setEdit();
  // console.log(data);
  const prevTitle = titleData;
  const prevContent = contentData;
  const prevId = idData;
  console.log("details");
  const [title, setTitle] = useState(prevTitle);
  const [content, setContent] = useState(prevContent);

  useEffect(() => {
    setTitle(titleData);
    setContent(contentData);
  }, [titleData, contentData]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const { user, deleteNote, addNote } = UserAuth();

  const editHandler = () => {
    deleteNote(`${user?.email}`, prevId, prevTitle, prevContent);
    addNote(`${user?.email}`, title, content);
    setEdit(false);
  };

  return (
    <div>
      <div>
        <div
          onClick={setEdit}
          className="cursor-pointer fixed top-0 left-0 w-screen h-screen bg-black opacity-60"
        ></div>
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-43%] p-4 rounded-lg bg-white border border-slate-300 z-[1000] w-[60%] m-auto">
          <form onSubmit={editHandler} action="">
            <input
              type="text"
              name="noteTitle"
              id="noteTitle"
              autoComplete="off"
              placeholder="Note Header"
              className="font-bold mb-4 p-4 rounded-xl border border-slate-300 focus:outline-none focus:border-slate-500 w-full"
              value={title}
              onChange={titleHandler}
            />
            <textarea
              name="noteContent"
              id="noteContent"
              placeholder="Your note goes here..."
              className="mb-2 p-4 resize-none rounded-xl border border-slate-300 focus:outline-none focus:border-slate-500 w-full h-[200px] sm:h-[377px] text-sm"
              value={content}
              onChange={contentHandler}
            />
            <Button>Apply</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
