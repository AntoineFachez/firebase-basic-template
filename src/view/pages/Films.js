import React, { useContext, useEffect, useState } from "react";
import CategoryWidget from "../components/category/CategoryWidget";
import FilmWidget from "../components/film/FilmLibrary";
import { FilmContext } from "../../context/FilmContext";
import { CategoryContext } from "../../context/CategoryContext";

function Films() {
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filteredFilmDBIDs, setFilteredFilmDBIDs] = useState([]);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [defaultFilmDB, setDefaultFilmDB] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("-------------");
  console.log("--- 1 --filmDB: ", filmDB);
  // console.log("--- 5 --filteredFilmDBIDList[i]", filteredFilmDBIDList[i]);
  // console.log("--- 6 --filmDB[j].film.id_film", filmDB[j].film.id_film);
  //  console.log("******** MATCH **********", element);
  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };

  //TODO: build filteredFilmIDs: go through filmDB, search for selectedCategories[i], collect id_film matching selectedCategories
  //TODO: build filteredFilmDB: go through filmDB, search for filteredFilmIDs[j], collect filmDB[k].film
  const filteredFilmsByCatgory = (filmDB, selectedCategories) => {
    console.log("--- 2 --selected Categories: ", selectedCategories);
    filmDB.forEach((element) => {
      const checkElement = element.film.categories;
      const id_film = element.film.id_film;
      console.log("--- 3 --FilmDB Element id_film ", id_film);
      selectedCategories.forEach((element) => {
        console.log("--- each selectedCategory", element);
      });
      console.log("--- 4 --Film Categories", checkElement);
    });
  };
  filteredFilmsByCatgory(filmDB, selectedCategories);
  console.log("--- 5 --filtered ID List: ", filteredFilmDBIDs);
  console.log("--- 7 --filtered DB: ", filteredFilmDB);

  return (
    <div>
      <h1>FilmLibrary</h1>
      <CategoryWidget
        categoriesDB={categoriesDB}
        setCategoriesDB={setCategoriesDB}
        getSelectedCategories={getSelectedCategories}
      />
      <p>{JSON.stringify(selectedCategories)}</p>
      <p>filteredFilmDBIDs</p> <p> {JSON.stringify(filteredFilmDBIDs)}</p>
      {/* <p>filtered Film DB List {JSON.stringify(filteredFilmDB)}</p> */}
      <FilmWidget filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
