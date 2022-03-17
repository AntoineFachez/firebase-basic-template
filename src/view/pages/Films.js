import React, { useContext, useEffect, useState } from "react";
import CategoryWidget from "../components/category/CategoryWidget";
import FilmLibrary from "../components/film/FilmLibrary";
import { FilmContext } from "../../context/FilmContext";
import { CategoryContext } from "../../context/CategoryContext";
import Carousel from "../components/carousel/Carousel";

function Films() {
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filteredFilmDBIDs, setFilteredFilmDBIDs] = useState([]);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [defaultFilmDB, setDefaultFilmDB] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [index, setIndex] = useState(0);

  const [playing, setPlaying] = useState();
  // console.log("-------------");
  // console.log("--- 1 --filmDB: ", filmDB);
  // console.log("--- 5 --filteredFilmDBIDList[i]", filteredFilmDBIDList[i]);
  // console.log("--- 6 --filmDB[j].film.id_film", filmDB[j].film.id_film);
  //  console.log("******** MATCH **********", element);
  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };
  const startUpFilms = (filmData) => {
    setDefaultFilmDB(filmData);
  };
  //TODO: remove duplicates from Array to player

  const filteredFilmsByCatgory = (filmDB, selectedCategories) => {
    // console.log("--- 2 --selected Categories: ", selectedCategories);
    if (selectedCategories) {
      filmDB.forEach((film) => {
        const filmCategories = film.film.categories;
        const filmData = film;
        // console.log("--- 3 --FilmDB Element filmData ", filmData);
        filmCategories.forEach((filmCategoryID) => {
          if (filteredFilmDB.indexOf(film) === -1) {
            // console.log("--- each filmCategory", filmCategoryID);
            selectedCategories.forEach((categoryID) => {
              // console.log(filmCategoryID.cate.id_cate, categoryID);
              if (filmCategoryID.cate.id_cate === categoryID) {
                const found = filmData;
                // console.log("YEAH", found);
                // const foundFilm = filmData;
                // return filteredDB(filmData);
                filteredFilmDB.push(found);
                removeDuplicates(filteredFilmDB);
                // return found;
                // filteredFilmDB.push(foundFilm);
              }
            });
          }
        });
        // console.log("--- 4 --Film Categories", filmCategories);
        // setFilteredFilmDBIDs((filteredFilmDBIDs) => [
        //   ...filteredFilmDBIDs,
        //   id_film,
        // ]);
      });
    }
  };
  const removeDuplicates = (arr) => {
    arr.filter((item, index) => arr.indexOf(item) === index);
  };

  useEffect(() => {
    setFilteredFilmDB([]);

    return () => {};
  }, [selectedCategories]);

  filteredFilmsByCatgory(filmDB, selectedCategories);
  // console.log("--- 5 --filtered ID List: ", filteredFilmDBIDs);
  // console.log("--- 7 --filtered DB: ", filteredFilmDB);
  const loadClipIntoPlayer = (e, index) => {
    e.preventDefault();
    setIndex(index);
    setPlaying(true);
    setTimeout(() => {
      window.scrollTo({
        top: 350,
        behavior: "smooth",
      });
    }, 1500);
  };
  return (
    <div>
      <h1>FilmLibrary</h1>
      <div className="carousel">
        <Carousel
          data={filteredFilmDB.data}
          loadClipIntoPlayer={loadClipIntoPlayer}
        />
      </div>
      <CategoryWidget
        categoriesDB={categoriesDB}
        setCategoriesDB={setCategoriesDB}
        getSelectedCategories={getSelectedCategories}
      />
      {/* <p>{JSON.stringify(selectedCategories)}</p> */}
      {/* <p>filteredFilmDBIDs</p> <p> {JSON.stringify(filteredFilmDBIDs)}</p> */}
      {/* <p>filtered Film DB List {JSON.stringify(filteredFilmDB)}</p> */}
      <FilmLibrary filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
