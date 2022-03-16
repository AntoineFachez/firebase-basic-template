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
  console.log("--- 2 --first id_film in FilmDB ", filmDB[0].film.id_film);

  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };

  const filterFilmDBByCategory = () => {
    console.log("--- 3 --selected Categories: ", selectedCategories);
    for (
      var g = 0, lengthSelectedCategory = selectedCategories.length;
      g < lengthSelectedCategory;
      g++
    ) {
      for (var h = 0, lengthFilmDB = filmDB.length; h < lengthFilmDB; h++) {
        const id_film = filmDB[h].film.id_film;
        filteredList(filmDB, id_film);

        const subResult = findNested(
          filmDB[h],
          "id_cate",
          selectedCategories[g]
        );

        if (subResult !== undefined || typeof subResult !== "string") {
          setFilteredFilmDBIDs((filteredFilms) => [
            ...filteredFilms,
            subResult,
          ]);
          if (filteredFilmDBIDs.length > 0) {
            // filteredList(filmDB, filteredFilmDBIDs);
            // filteredList(filmDB, id_film);
          }
        }
        findNested(filmDB[h], "id_cate", selectedCategories[g]);

        function findNested(obj, key, value) {
          // Base case
          if (obj[key] === value) {
            // return obj ;
            return id_film;
          } else {
            var keys = Object.keys(obj); // add this line to iterate over the keys

            for (var i = 0, len = keys.length; i < len; i++) {
              var k = keys[i]; // use this key for iteration, instead of index "i"
              // add "obj[k] &&" to ignore null values
              if (obj[k] && typeof obj[k] == "object") {
                var found = findNested(obj[k], key, value);
                if (found) {
                  // If the object was found in the recursive call, bubble it up.

                  return found;
                }
              }
            }
          }
        }
      }
    }
  };

  console.log("--- 4 --filtered ID List: ", filteredFilmDBIDs);

  function filteredList(filmDB, filteredFilmDBIDList) {
    var matches = [];
    for (
      var i = 0, lenfilteredFilmDBIDList = filteredFilmDBIDList.length;
      i < lenfilteredFilmDBIDList;
      i++
    ) {
      console.log("--- 5 --filteredFilmDBIDList[i]", filteredFilmDBIDList[i]);
      for (var j = 0, lenFilmDB = filmDB.length; j < lenFilmDB; j++) {
        console.log("--- 6 --filmDB[j].film.id_film", filmDB[j].film.id_film);
        if (filteredFilmDBIDList[i] === filmDB[j].film.id_film) {
          const element = filmDB[j];
          console.log("******** MATCH **********", element);
          setFilteredFilmDB((filteredFilmDB) => [...filteredFilmDB, element]);
        }
      }
    }
    // setFilteredFilmDB((filteredFilmDB) => [...filteredFilmDB, filmDB[g]]);
    return matches;
  }

  useEffect(() => {
    setFilteredFilmDB([]);
    setFilteredFilmDBIDs([]);
    filterFilmDBByCategory(filmDB);
    console.log("--- 7 --filtered DB: ", filteredFilmDB);

    if (filteredFilmDBIDs) {
      console.log("läuft");
    } else {
      return defaultFilmDB;
    }
    return () => {};
  }, [selectedCategories]);

  return (
    <div>
      <h1>FilmLibrary</h1>
      <CategoryWidget
        categoriesDB={categoriesDB}
        setCategoriesDB={setCategoriesDB}
        getSelectedCategories={getSelectedCategories}
      />
      <p>filteredFilmDBIDs</p> <p> {JSON.stringify(filteredFilmDBIDs)}</p>
      {/* <p>filtered Film DB List {JSON.stringify(filteredFilmDB)}</p> */}
      <FilmWidget filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
