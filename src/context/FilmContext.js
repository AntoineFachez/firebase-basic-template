//

import React, { useState, useEffect, createContext } from "react";
import {
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  doc,
  where,
  getDocsFromCache,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase/firebase-config";

//TODO: refactor: if offline, use local storage
//TODO: build: defaultFilmList
export const FilmContext = createContext();

export const FilmProvider = (props) => {
  const [filmDB, setFilmDB] = useState(
    JSON.parse(localStorage.getItem("filmDB")) || []
  );
  const [data, setData] = useState([]);
  const [nextBatch, setNextBatch] = useState(
    JSON.parse(localStorage.getItem("nextBatch")) || []
  );
  const [singleFilm, setSingleFilm] = useState(
    JSON.parse(localStorage.getItem("singleFilm")) || []
  );
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const getFilms = async () => {
    //
    //How to NOT get 30k invoice from FIRESTORE
    //https://www.youtube.com/watch?v=Lb-Pnytoi-8&list=PLvW9K-r9avwr-bXLAEbiHN_V9UbpZfcfc&index=207
    //
    if (!localStorage.getItem("filmDB")) {
      const filmsCollectionRef = collection(db, "films");
      const dataIn = await getDocs(filmsCollectionRef);
      setFilmDB(dataIn.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      setFilmDB(localStorage.getItem("filmDB"));
    }
  };

  // const getNextFilmBatch = async () => {
  //   const filmsCollectionRef = query(
  //     collection(db, "cities"),
  //     where("dateUpload", "==", "2018-10-23 02:45:10")
  //   );
  //   const docRef = query(filmsCollectionRef);
  //   const dataIn = await getDoc(docRef);
  //   if (dataIn.exists()) {
  //     const data = [dataIn.data()];
  //     console.log("Document data:", data);
  //     setNextBatch(data);
  //     // setFilmDB(dataIn.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };
  const getNextFilmBatch = async () => {
    if (!localStorage.getItem("nextBatchs")) {
      const colRef = collection(db, "films");

      // Keep adding query clauses in query()
      // like chaining them in name-spaced V8 version
      const q = query(colRef, orderBy("film.dateUpload", "desc"), limit(200));

      const data = await getDocs(q);
      setNextBatch(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilmDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
    }
  };

  // const getEntireLibrary = async () => {
  //   const dataIn = await filmsCollectionRef;
  //   // .orderBy("id")
  //   // .limit(10)
  //   // .get();
  //   setFilmDB(dataIn.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  const getSomeRandomThreeEntries = async () => {
    // const dataIn = await filmsCollectionRef;
    // setFilmDB(dataIn.docs.mao((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getSpecificEntry = async () => {
    const singleFilmID = "0292D3B6-27E0-40D2-8B3D-0B096E52DE66";
    if (!localStorage.getItem("singleFilm") === singleFilmID) {
      const docRef = doc(db, "films", singleFilmID);
      const dataIn = await getDoc(docRef);
      if (dataIn.exists()) {
        const data = [dataIn.data()];
        setSingleFilm(data);
        // setFilmDB(dataIn.data());
        console.log("Document data:", data);
      } else if (localStorage.getItem("singleFilm").exists()) {
        localStorage.getItem("singleFilm");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
    }
  };

  const getSomeOtherSpecificEntry = async () => {
    // const dataIn = await filmsCollectionRef
    //   .doc("00028E8C-CDC7-418F-AA7E-D4DA76FC5D54")
    //   .get();
    // // .where("id", "==", "001E3886-32F8-4A2D-97D9-A4E2CC1F1A1B")
    // // .get()
    // // .then((querySnapshot) => {
    // //   querySnapshot.forEach((doc) =>
    // //     doc.update({
    // //       active: false,
    // //     })
    // //   );
    // // });
    // setFilmDB(dataIn.docs.mao((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log(dataIn);
  };
  //TODO: refactor: if offline, use local storage

  // const getFilmDB = JSON.parse(localStorage.getItem("filmDB"));
  useEffect(() => {
    // getEntireLibrary();
    // getFilms();
    getNextFilmBatch();
    // defaultFilmList();
    // getSpecificEntry();
  }, []);
  localStorage.setItem("filmDB", JSON.stringify(filmDB));
  localStorage.setItem("nextBatch", JSON.stringify(nextBatch));
  localStorage.setItem("singleFilm", JSON.stringify(singleFilm));
  console.log(nextBatch);
  console.log(localStorage.length);

  return (
    <FilmContext.Provider value={[filmDB, setFilmDB]}>
      {props.children}
    </FilmContext.Provider>
  );
};
