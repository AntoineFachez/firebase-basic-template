import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { categoryAction, categoryAction2 } from "../actions/CategoryActions";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  // const [categories, setcategories] = useState([
  const categoriesCollectionRef = collection(db, "categories");
  const [categoriesDB, setCategoriesDB] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // console.log(categories);
  useEffect(() => {
    const getcategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategoriesDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getcategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={[categoriesDB, setCategoriesDB, categoryAction, categoryAction2]}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
