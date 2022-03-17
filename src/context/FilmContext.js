import React, { useState, useEffect, createContext } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

//TODO: refactor: if offline, use local storage
//TODO: build: defaultFilmList
export const FilmContext = createContext();

export const FilmProvider = (props) => {
  // const [films, setFilms] = useState([
  const filmsCollectionRef = collection(db, "films");
  const [data, setData] = useState([]);
  const [filmDB, setFilmDB] = useState(
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
  localStorage.setItem("filmDB", JSON.stringify(filmDB));

  const defaultFilmList = () => {
    filmDB.slice(0, 9).map((film, index) => "");
  };

  // const getEntireLibrary = async () => {
  //   const dataIn = await filmsCollectionRef;
  //   // .orderBy("id")
  //   // .limit(10)
  //   // .get();
  //   setFilmDB(dataIn.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };
  //FIXME: non of these work. the only get that works, is the getEntireLibrary
  const getSomeRandomThreenEntries = async () => {
    const dataIn = await filmsCollectionRef;
    setFilmDB(dataIn.docs.mao((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getSpecificEntry = async () => {
    const dataIn = await filmsCollectionRef
      .where("id", "==", "001E3886-32F8-4A2D-97D9-A4E2CC1F1A1B")
      .get();
    setFilmDB(dataIn.docs.mao((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(dataIn);
  };
  const getSomeOtherSpecificEntry = async () => {
    const dataIn = await filmsCollectionRef
      .doc("00028E8C-CDC7-418F-AA7E-D4DA76FC5D54")
      .get();
    // .where("id", "==", "001E3886-32F8-4A2D-97D9-A4E2CC1F1A1B")
    // .get()
    // .then((querySnapshot) => {
    //   querySnapshot.forEach((doc) =>
    //     doc.update({
    //       active: false,
    //     })
    //   );
    // });
    setFilmDB(dataIn.docs.mao((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(dataIn);
  };
  //TODO: refactor: if offline, use local storage

  // const getFilmDB = JSON.parse(localStorage.getItem("filmDB"));
  useEffect(() => {
    // getEntireLibrary();
    // defaultFilmList();
    getFilms();
  }, []);

  return (
    <FilmContext.Provider value={[filmDB, setFilmDB]}>
      {props.children}
    </FilmContext.Provider>
  );
};
