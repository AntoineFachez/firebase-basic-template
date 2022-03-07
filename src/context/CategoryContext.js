import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  // const [categories, setcategories] = useState([
  const categoriesCollectionRef = collection(db, "category");
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // console.log(categories);
  useEffect(() => {
    const getcategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data);
    };
    getcategories();
  }, []);

  return (
    <CategoryContext.Provider value={[categories, setCategories]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
