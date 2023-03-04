import React, { createContext, useContext, useState, useEffect } from "react";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), { notes: [] });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function addNote(email, id, title, content) {
    updateDoc(doc(db, "users", email), {
      notes: arrayUnion({
        id: id,
        title: title !== "" ? title : "Unknown",
        content: content !== "" ? content : "Unknown",
      }),
    });
  }

  function deleteNote(email, id, title, content) {
    updateDoc(doc(db, "users", email), {
      notes: arrayRemove({
        id: id,
        title: title,
        content: content,
      }),
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <UserContext.Provider
      value={{ signUp, login, logout, addNote, deleteNote, user }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function UserAuth() {
  return useContext(UserContext);
}
