import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const FilmContext = createContext();

export const FilmProvider = (props) => {
  // const [films, setFilms] = useState([
  const filmsCollectionRef = collection(db, "films");
  const [data, setData] = useState([]);
  const [filmDB, setFilmDB] = useState(
    //TODO: refactor local storage if offline
    JSON.parse(localStorage.getItem("filmDB")) || []
  );
  // console.log(films[1].film.title);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const getFilms = async () => {
    const dataIn = await getDocs(filmsCollectionRef);
    setFilmDB(dataIn.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  //TODO: refactor: if offline, use local storage
  localStorage.setItem("filmDB", JSON.stringify(filmDB));
  // const getFilmDB = JSON.parse(localStorage.getItem("filmDB"));
  useEffect(() => {
    getFilms();
  }, []);

  return (
    <FilmContext.Provider value={[filmDB, setFilmDB]}>
      {props.children}
    </FilmContext.Provider>
  );
};
