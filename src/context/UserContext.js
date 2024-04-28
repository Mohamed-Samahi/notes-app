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
  deleteDoc,
  addDoc,
  Timestamp,
  collection
} from "firebase/firestore";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email));
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function handleAddNote(email, id, title, content) {
    try {
      await addDoc(collection(db, 'users', email, 'notes'), {
        id: id,
        title: title,
        content: content,
        created: Timestamp.now()
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateNote = async (id, title, content) => {
    const taskDocRef = doc(db, 'users', user?.email, 'notes', id)

    try {
      await updateDoc(taskDocRef, {
        title: title || '',
        content: content || ''
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteNote = async (id) => {
    const taskDocRef = doc(db, 'users', user?.email, 'notes', id)
    try {
      await deleteDoc(taskDocRef)
    } catch (err) {
      console.error(err)
    }
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
      value={{ user, signUp, login, logout, handleAddNote, handleUpdateNote, handleDeleteNote }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function UserAuth() {
  return useContext(UserContext);
}