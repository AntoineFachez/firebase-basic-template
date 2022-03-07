import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const FkFilmXfkCateContext = createContext();

export const FkFilmXfkCateProvider = (props) => {
  // const [fk_filmXfk_cate, setfk_filmXfk_cate] = useState([
  const fkFilmXfkCateCollectionRef = collection(db, "fk_filmXfk_cate");
  const [fkFilmXfkCate, setFkFilmXfkCate] = useState([]);
  const url = useState([]);
  const cateName = useState([]);
  const cityID = useState([]);
  const [id, setId] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    const getfk_filmXfk_cate = async () => {
      const data = await getDocs(fkFilmXfkCateCollectionRef);
      setFkFilmXfkCate(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data);
    };
    getfk_filmXfk_cate();
  }, []);

  return (
    <FkFilmXfkCateContext.Provider value={[fkFilmXfkCate, setFkFilmXfkCate]}>
      {props.children}
    </FkFilmXfkCateContext.Provider>
  );
};
