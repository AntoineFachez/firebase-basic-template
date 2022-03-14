import React, { useContext, useState } from "react";
import CategoryWidget from "../../components/category/CategoryWidget";
import FilmWidget from "../../components/film/FilmLibrary";
import { CategoryContext } from "../../context/CategoryContext";
import { FilmContext } from "../../context/FilmContext";

function Films() {
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
    console.log(selectedCategories);
  };
  return (
    <div>
      <h1>FilmLibrary</h1>
      <CategoryWidget
        categoriesDB={categoriesDB}
        setCategoriesDB={setCategoriesDB}
        getSelectedCategories={getSelectedCategories}
      />
      <p>{selectedCategories}</p>
      <FilmWidget filmDB={filmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
