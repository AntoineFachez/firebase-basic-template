import React, { useContext, useEffect, useState } from "react";
import CategoryWidget from "../components/category/CategoryWidget";
import FilmWidget from "../components/film/FilmLibrary";
import { CategoryContext } from "../../context/CategoryContext";
import { FilmContext } from "../../context/FilmContext";

function Films() {
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };
  // User can be part of many groups

  // const result = filmDB.filter((film) =>
  //   film.filmXcate.find((film) =>
  //     selectedCategories.includes(selectedCategories.fk_cate)
  //   )
  // );
  // console.log(result);

  const flattenObj = (ob) => {
    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in ob) {
      // We check the type of the i using
      // typeof() function and recursively
      // call the function again
      if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
        const temp = flattenObj(ob[i]);
        for (const j in temp) {
          // Store temp in result
          if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {
              // Store temp in result
              result[i + "." + j] = temp[j];
            }
          }
        }
      }
      // Else store ob[i] in result directly
      else {
        result[i] = ob[i];
      }
    }
    return result;
  };
  // console.log(flattenObj(filmDB));

  // console.log(filmDB.flat(Infinity));
  // console.log(filmDB[128].film.filmXcate);

  // console.log(filmDB.filter((film) => film[0].title.length > 6));
  const filterFilmDBByCategory = () => {
    console.log("filmDB: ", filmDB);
    console.log("selected Categories: ", selectedCategories);
    console.log("filtered DB: ", filteredFilmDB);
    for (var h = 0, lengthFilmDB = filmDB.length; h < lengthFilmDB; h++) {
      console.log(findNested(filmDB, "id_cate", selectedCategories[0]));
      findNested(filmDB, "id_cate", selectedCategories[0]);
      // findNested(filmDB, "id_cate", selectedCategories[0]);
      console.log("object id_film", filmDB[h].film.id_film);
      console.log("object vimeoID", filmDB[h].film.vimeoID);
      function findNested(obj, key, value) {
        // Base case
        if (obj[key] === value) {
          return obj;
        } else {
          var keys = Object.keys(obj); // add this line to iterate over the keys

          // console.log("object filmID", obj.id_film);
          // console.log("each film id", obj);
          for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i]; // use this key for iteration, instead of index "i"
            // add "obj[k] &&" to ignore null values
            if (obj[k] && typeof obj[k] == "object") {
              var found = findNested(obj[k], key, value);
              if (found) {
                // console.log("found");
                // If the object was found in the recursive call, bubble it up.
                return found;
              }
            }
          }
        }
      }
    }
    // // returns object
    // console.log(findNested(filmDB, "icon", "edit")); // returns object
    // console.log(findNested(filmDB, "foo", "bar")); // returns undefined

    // // this will work now
    // console.log(findNested(filmDB, "icon", "nested")); // returns object

    setFilteredFilmDB(filmDB);
  };
  useEffect(() => {
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
      {/* <FilmWidget filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} /> */}
    </div>
  );
}

export default Films;
