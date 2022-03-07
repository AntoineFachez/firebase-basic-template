//https://www.youtube.com/watch?v=PKwu15ldZ7k
import React, { useContext, useEffect, useState, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

export const UserAuthContext = createContext(auth);

export function useUserAuth() {
  return useContext(UserAuthContext);
}

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState([]);
  // console.log(user);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  //   function resetPassword(email) {
  //     return auth.sendPasswordResetEmail(email);
  //   }
  //   function updateEmail(email) {
  //     return currentUser.updateEmail(email);
  //   }
  //   function updatePassword(password) {
  //     return currentUser.updatePassword(password);
  //   }
  const value = {
    user,
    logIn,
    signUp,
    logOut,

    // resetPassword,
    // updateEmail,
    // updatePassword,
  };
  return (
    <UserAuthContext.Provider value={value}>
      {!loading && children}
    </UserAuthContext.Provider>
  );
}
