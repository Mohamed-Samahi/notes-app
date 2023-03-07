import React, { useContext, createContext, useState } from "react";

const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteID, setNoteID] = useState("");

  return (
    <DataContext.Provider
      value={{
        noteTitle,
        noteContent,
        noteID,
        setNoteTitle,
        setNoteContent,
        setNoteID,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function DataAuth() {
  return useContext(DataContext);
}
