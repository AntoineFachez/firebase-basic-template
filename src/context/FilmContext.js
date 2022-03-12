import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const FilmContext = createContext();

export const FilmProvider = (props) => {
  // const [films, setFilms] = useState([
  const filmsCollectionRef = collection(db, "film");
  const [films, setFilms] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    const getFilms = async () => {
      const data = await getDocs(filmsCollectionRef);
      setFilms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getFilms();
  }, []);

  return (
    <FilmContext.Provider value={[films, setFilms]}>
      {props.children}
    </FilmContext.Provider>
  );
};
