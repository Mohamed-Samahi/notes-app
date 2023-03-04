import React, { useState, useEffect } from "react";

import { BiSearch } from "react-icons/bi";

import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { UserAuth } from "../context/UserContext";
import Note from "./Note";
import NoteDetails from "./NoteDetails";
import Loading from "./Loading";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [notesListLength, setNotesListLength] = useState(0);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState(true);

  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setNotes(
      notes?.filter((item) => {
        return (
          item?.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
          item?.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      })
    );
  };

  const { user, deleteNote } = UserAuth();

  let elementTitle, elementContent, elementId;

  const contentRetreival = (e) => {
    elementTitle =
      e.target.parentElement.parentElement.children[0].children[0].children[0]
        .innerHTML;
    elementContent =
      e.target.parentElement.parentElement.children[0].children[0].children[1]
        .innerHTML;
    elementId =
      e.target.parentElement.parentElement.children[0].children[0].attributes[0]
        .value;
    return { elementTitle, elementContent, elementId };
  };

  const showOverlayHandler = (e) => {
    if (e.target.value === "Edit") {
      setEdit(true);
      const data = contentRetreival(e);
      return data;
    } else {
      setEdit(!edit);
    }
  };

  const deleteHandler = async (e) => {
    contentRetreival(e);
    await deleteNote(`${user?.email}`, elementId, elementTitle, elementContent);
  };

  useEffect(() => {
    setIsLoading(true);
    if (navigator.onLine) {
      setConnection(true);
      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setNotes(doc.data()?.notes);
        setIsLoading(false);
        setNotesListLength(notes?.length);
      });
    } else {
      return setConnection(false);
    }
  }, [user?.email, notes?.length]);

  console.log("rendered");
  return (
    <div className="h-[574px]">
      <h1 className="p-2 pl-0 font-bold text-3xl leading-[2.07rem]">Notes</h1>

      <div className="relative">
        <div className="absolute left-4 top-[40%] translate-y-[-50%] text-slate-500">
          <BiSearch />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search notes"
          className="mb-4 p-4 pl-10 rounded-xl border border-slate-300 focus:outline-none focus:border-slate-500 w-full"
          value={search}
          onChange={searchHandler}
        />
      </div>

      <div className="overflow-y-auto h-[453px] w-full border border-slate-300 rounded-xl p-4">
        {!connection && (
          <h1 className="text-sm text-gray-400">please check your network</h1>
        )}
        {isLoading && <Loading />}
        {!isLoading && notesListLength === 0 && (
          <h1 className="text-sm text-gray-400">You don't have any notes</h1>
        )}
        {!isLoading &&
          notes
            ?.filter((item) => {
              return (
                item?.title.toLowerCase().indexOf(search.toLowerCase()) !==
                  -1 ||
                item?.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
              );
            })
            .map((note) => (
              <div className="flex justify-between items-center border border-slate-300 rounded-lg px-2 my-2">
                <Note
                  id={note?.id}
                  title={note?.title}
                  content={note?.content}
                />
                <div className="flex justify-between items-center w-[40%]">
                  <button
                    onClick={showOverlayHandler}
                    className="w-[48%] text-center text-[0.65rem] sm:text-xs bg-yellow-300 px-1 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={deleteHandler}
                    className="w-[48%] text-center text-[0.65rem] sm:text-xs bg-yellow-300 px-1 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        {edit && (
          <NoteDetails
            titleData={elementTitle}
            contentData={elementContent}
            idData={elementId}
            setEdit={showOverlayHandler}
          />
        )}
      </div>
    </div>
  );
};

export default NotesList;
