import React, { useContext, useEffect, useState } from "react";
import CategoryWidget from "../components/category/CategoryWidget";
import FilmWidget from "../components/film/FilmLibrary";
import { CategoryContext } from "../../context/CategoryContext";
import { FilmContext } from "../../context/FilmContext";

function Films() {
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const [filteredFilmDBIDs, setFilteredFilmDBIDs] = useState([]);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [defaultFilmDB, setDefaultFilmDB] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("-------------");
  console.log("--- 1 --filmDB: ", filmDB);
  console.log("--- 2 --first id_film in FilmDB ", filmDB[0].film.id_film);
  console.log("--- 3 --selected Categories: ", selectedCategories);

  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };

  const filterFilmDBByCategory = () => {
    for (
      var g = 0, lengthSelectedCategory = selectedCategories.length;
      g < lengthSelectedCategory;
      g++
    ) {
      for (var h = 0, lengthFilmDB = filmDB.length; h < lengthFilmDB; h++) {
        const id_film = filmDB[h].film.id_film;

        const subResult = findNested(
          filmDB[h],
          "id_cate",
          selectedCategories[g]
        );
        if (subResult !== undefined) {
          setFilteredFilmDBIDs((filteredFilmDBIDs) => [
            ...filteredFilmDBIDs,
            subResult,
          ]);
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
                  filteredList(filmDB, filteredFilmDBIDs);
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
    for (var g = 0, lenArr = filmDB.length; g < lenArr; g++) {
      for (
        var h = 0, lenfilteredFilmDBIDList = filteredFilmDBIDList.length;
        h < lenfilteredFilmDBIDList;
        h++
      ) {
        if ((filteredFilmDBIDList[h] = filmDB[g].film.id_film)) {
          console.log(
            "--- 5 --filteredFilmDBIDList[h]",
            filteredFilmDBIDList[h]
          );
          console.log("--- 6 --filmDB[g].film.id_film", filmDB[g].film.id_film);
          setFilteredFilmDB((filteredFilmDB) => [...filteredFilmDB, filmDB[g]]);
        }
      }
    }
    return matches;
  }

  console.log("--- 7 --filtered DB: ", filteredFilmDB);

  useEffect(() => {
    setFilteredFilmDB([]);
    setFilteredFilmDBIDs([]);
    filterFilmDBByCategory(filmDB);

    if (filteredFilmDBIDs) {
      console.log("läuft");
    } else {
      return defaultFilmDB;
    }
    return () => {};
  }, [selectedCategories]);

  return (
    <div>
      {/* <p>{selectedCategories}</p> */}
      <h1>FilmLibrary</h1>
      <CategoryWidget
        categoriesDB={categoriesDB}
        setCategoriesDB={setCategoriesDB}
        getSelectedCategories={getSelectedCategories}
      />
      <p>selected Categories {selectedCategories}</p>
      <p>filtered Film DB IDs</p> <p> {JSON.stringify(filteredFilmDBIDs)}</p>
      {/* <p>filtered Film DB List {JSON.stringify(filteredFilmDB)}</p> */}
      <FilmWidget filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
