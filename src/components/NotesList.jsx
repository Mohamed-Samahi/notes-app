import React, { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { UserAuth } from "../context/UserContext";
import Note from "./Note";
import NoteDetails from "./NoteDetails";
import Button from "./Button";
import Loading from "./Loading";
import DeleteModal from "./DeleteModal";

const NotesList = () => {
  const { user, handleDeleteNote } = UserAuth();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState();
  const [noteId, setNoteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* function to get all tasks from firestore in realtime */
  const getNotes = () => {
    setIsLoading(prev => true);
    const q = query(collection(db, 'users', user?.email, 'notes'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setNotes(querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })));
    });
    setIsLoading(prev => false);
  }

  useEffect(() => {
    getNotes();
  }, [user?.email]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredNotes(notes);
      return;
    }

    const filtered = notes.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputRef.current.value.trim().toLowerCase());
  };

  const handleInputBlur = () => {
    setSearchTerm(inputRef.current.value.trim().toLowerCase());
  };

  const handleDelete = async (id) => {
    try {
      await handleDeleteNote(id);
      setOpenDeleteModal(prev => false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditModal = (noteId, noteTitle, noteContent) => {
    setModalData({ noteId, noteTitle, noteContent });
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (noteId) => {
    setNoteId(prev => noteId)
    setOpenDeleteModal(true);
  };

  return (
    <div className="h-[574px]">
      <h1 className="p-2 pl-0 font-bold text-3xl leading-[2.07rem]">Notes</h1>
      <div className="relative">
        <div className="absolute left-4 top-[40%] translate-y-[-50%] text-slate-500">
          <BiSearch />
        </div>
        <form>
          <input
            ref={inputRef}
            type="search"
            name="search"
            id="search"
            placeholder="search notes"
            className="w-full p-4 pl-10 mb-4 border rounded-xl border-yellow-3000 focus:outline-none focus:border-slate-500"
            onBlur={handleInputBlur}
            onChange={handleSearchSubmit}
          />
        </form>
      </div>
      <div className="overflow-y-auto h-[453px] w-full border border-yellow-3000 rounded-xl p-4 relative">
        {isLoading ? <Loading /> : ""}
        {(notes.length && !isLoading) === 0 && (
          <h1 className="text-sm text-gray-400">You don't have any notes</h1>
        )}
        {(filteredNotes.length && !isLoading) === 0 && (
          <h1 className="text-sm text-gray-400">Not Found!</h1>
        )}
        {!isLoading && filteredNotes.map((note) => (
          <div key={note.id} className="flex items-center justify-between px-2 py-1 my-2 overflow-hidden border rounded-lg border-slate-300">
            <Note
              id={note.id}
              title={note.title}
              content={note.content}
            />
            <div className="flex justify-between items-center w-[40%]">
              <Button
                value="Edit"
                onClick={() => handleOpenEditModal(note.id, note.title, note.content)}
                className="w-[48%] text-center text-[0.65rem] sm:text-xs px-1 py-1 rounded-lg"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleOpenDeleteModal(note.id)}
                className="w-[48%] text-center text-[0.65rem] sm:text-xs px-1 py-1 rounded-lg"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {/* edit modal */}
        {openEditModal && (
          <NoteDetails
            modalData={modalData}
            setOpenEditModal={setOpenEditModal}
          />
        )}
      </div>
      {openDeleteModal ?
        <DeleteModal
          noteId={noteId}
          handleDelete={handleDelete}
          setOpenDeleteModal={setOpenDeleteModal}
        />

        : null}
    </div>
  );
};

export default NotesList;