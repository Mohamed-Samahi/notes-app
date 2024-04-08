import React, { useState, useEffect } from "react";

import { BiSearch } from "react-icons/bi";

import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { UserAuth } from "../context/UserContext";
import { DataAuth } from "../context/DataContext";

import Note from "./Note";
import NoteDetails from "./NoteDetails";
import Loading from "./Loading";
import Button from "./Button";

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

  const {
    // noteTitle,
    // noteContent,
    // noteID,
    setNoteTitle,
    setNoteContent,
    setNoteID,
  } = DataAuth();

  const contentRetreival = (e) => {
    setNoteTitle(
      e.target.parentElement.parentElement.children[0].children[0].children[0]
        .innerHTML
    );
    setNoteContent(
      e.target.parentElement.parentElement.children[0].children[0].children[1]
        .innerHTML
    );
    setNoteID(
      e.target.parentElement.parentElement.children[0].children[0].attributes[0]
        .value
    );
    return {
      noteTitle:
        e.target.parentElement.parentElement.children[0].children[0].children[0]
          .innerHTML,
      noteContent:
        e.target.parentElement.parentElement.children[0].children[0].children[1]
          .innerHTML,
      noteID:
        e.target.parentElement.parentElement.children[0].children[0]
          .attributes[0].value,
    };
  };

  const showOverlayHandler = (e) => {
    if (e.target.value === "Edit") {
      setEdit(true);
      contentRetreival(e);
    } else {
      setEdit(!edit);
    }
  };

  const deleteHandler = async (e) => {
    const { noteTitle, noteContent, noteID } = contentRetreival(e);
    await deleteNote(`${user?.email}`, noteID, noteTitle, noteContent);
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
          className="w-full p-4 pl-10 mb-4 border rounded-xl border-slate-300 focus:outline-none focus:border-slate-500"
          value={search}
          onChange={searchHandler}
        />
      </div>

      <div className="overflow-y-auto h-[453px] w-full border border-slate-300 rounded-xl p-4 relative">
        {!connection && (
          <h1 className="text-sm text-gray-400">please check your network</h1>
        )}
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
              <div className="flex items-center justify-between px-2 my-2 overflow-hidden border rounded-lg border-slate-300">
                <Note
                  id={note?.id}
                  title={note?.title}
                  content={note?.content}
                />
                <div className="flex justify-between items-center w-[40%]">
                  <Button
                    value="Edit"
                    onClick={showOverlayHandler}
                    className="w-[48%] text-center text-[0.65rem] sm:text-xs px-1 py-1 rounded-lg"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={deleteHandler}
                    className="w-[48%] text-center text-[0.65rem] sm:text-xs bg-yellow-300 px-1 py-1 rounded-lg"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        {edit && (
          <NoteDetails
            // titleData={elementTitle}
            // contentData={elementContent}
            // idData={elementId}
            setEdit={showOverlayHandler}
          />
        )}
      </div>
    </div>
  );
};

export default NotesList;
