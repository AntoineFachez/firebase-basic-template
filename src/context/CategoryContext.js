import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
// import {
//   filteredFilmsByCatgory,
//   categoryAction2,
// } from "../actions/CategoryActions";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const categoriesCollectionRef = collection(db, "categories");
  const [categoriesDB, setCategoriesDB] = useState(
    JSON.parse(localStorage.getItem("categoriesDB")) || []
  );
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // console.log(categories);
  const getcategories = async () => {
    if (!localStorage.getItem("categoriesDB")) {
      const data = await getDocs(categoriesCollectionRef);
      setCategoriesDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      localStorage.getItem("categoriesDB");
    }
  };
  localStorage.setItem("categoriesDB", JSON.stringify(categoriesDB));
  useEffect(() => {
    getcategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={[
        categoriesDB,
        setCategoriesDB,
        // filteredFilmsByCatgory,
        // categoryAction2,
      ]}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
