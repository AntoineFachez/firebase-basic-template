import React, { useState, useEffect, createContext, useContext } from "react";
import { CategoryContext } from "./CategoryContext";
import { FilmContext } from "./FilmContext";
import { categoryAction, categoryAction2 } from "../actions/CategoryActions";

export const ScoutingContext = createContext();

export const ScoutingProvider = (props) => {
  // const [categories, setcategories] = useState([

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {}, []);

  return (
    <ScoutingContext.Provider value={[]}>
      {props.children}
    </ScoutingContext.Provider>
  );
};
