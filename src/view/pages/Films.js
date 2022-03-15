import React, { useContext, useEffect, useState } from "react";
import CategoryWidget from "../components/category/CategoryWidget";
import FilmWidget from "../components/film/FilmLibrary";
import { CategoryContext } from "../../context/CategoryContext";
import { FilmContext } from "../../context/FilmContext";

function Films() {
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const [filteredFilmDBIDs, setFilteredFilmDBIDs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };

  const filterFilmDBByCategory = () => {
    console.log("filmDB: ", filmDB);
    console.log("selected Categories: ", selectedCategories);
    console.log("filtered DB: ", filteredFilmDBIDs);
    for (var h = 0, lengthFilmDB = filmDB.length; h < lengthFilmDB; h++) {
      const id_film = filmDB[h].film.id_film;

      const subResult = findNested(filmDB[h], "id_cate", selectedCategories[0]);
      if (subResult !== undefined) {
        setFilteredFilmDBIDs((filteredFilmDBIDs) => [
          ...filteredFilmDBIDs,
          subResult,
        ]);
      }
      findNested(filmDB[h], "id_cate", selectedCategories[0]);

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
  };
  const filteredList = () => {
    const results = filmDB.filter((obj) => {
      return obj.id === filteredFilmDBIDs;
    });
  };

  useEffect(() => {
    setFilteredFilmDBIDs([]);
    filterFilmDBByCategory(filmDB);
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
      <p>{selectedCategories}</p>
      <FilmWidget filteredFilmDB={filmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
