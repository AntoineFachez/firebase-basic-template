import React, { useContext, useEffect, useState } from "react";
import CategoryWidget from "../../components/category/CategoryWidget";
import FilmLibrary from "../../components/film-library/FilmLibrary";
import { FilmContext } from "../../context/FilmContext";
import { CategoryContext } from "../../context/CategoryContext";
import Carousel from "../../components/carousel/Carousel";
import MainPlayer from "../../components/main-player/MainPlayer";
import ScoutingTool from "../../components/scouting-tool/ScoutingTool";

//TODO: create defaultFilmList to load
function Films() {
  const [filmDB, setFilmDB] = useContext(FilmContext);
  console.log(filmDB);
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filteredFilmDBIDs, setFilteredFilmDBIDs] = useState([]);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [defaultFilmDB, setDefaultFilmDB] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [index, setIndex] = useState(0);
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(
    JSON.parse(localStorage.getItem("feed")) || []
  );
  const [playing, setPlaying] = useState();
  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };

  useEffect(() => {
    setFilteredFilmDB([]);
    return () => {};
  }, [selectedCategories]);

  const openWidget = () => {
    hide
      ? setHide(false) &&
        document
          .querySelector(".category-widget")
          .classlist.add(".small-widget")
      : setHide(true) &&
        document
          .querySelector(".small-widget")
          .classlist.add(".category-widget");
    // openCategoryWidget ? setWidth("15vw") : setWidth("20vw");
  };
  const filteredFilmsByCatgory = (filmDB, selectedCategories) => {
    // console.log("--- 2 --selected Categories: ", selectedCategories);
    // if (!filteredFilmDB) {
    // if (selectedCategories.length == 0) {
    //   // setFilteredFilmDB(filmDB.slice(0, 9).map((film, index) => ""));
    //   setFilteredFilmDB(filmDB.slice(0, 9));
    //   // setFilteredFilmDB(filmDB);
    // } else {
    if (selectedCategories.length > 0) {
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
                filteredFilmDB.push(found);
                removeDuplicates(filteredFilmDB);
              }
            });
          }
        });
      });
    } else {
      // setDefaultFilmDB(filmDB);
      console.log("null selectedCategories");
    }
    // }
  };
  const removeDuplicates = (arr) => {
    arr.filter((item, index) => arr.indexOf(item) === index);
  };

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
  const getThumbnail = () => {
    filteredFilmDB.forEach();
  };
  localStorage.setItem("filteredDB", JSON.stringify(filteredFilmDB));
  return (
    <div className="">
      <h1>FilmLibrary</h1>

      <MainPlayer
        // clipLink={clipLink}
        //   load={load}
        playing={playing}
        // play={play}
        filteredFilmDB={filteredFilmDB}
        index={index}
        light={false}
        // controls={controls}
        //   loaded={loaded}
      />
      <button
        className="btn"
        onClick={() => {
          openWidget();
        }}
      >
        X
      </button>
      <CategoryWidget
        categoriesDB={categoriesDB}
        setCategoriesDB={setCategoriesDB}
        getSelectedCategories={getSelectedCategories}
        hide={hide}
        openWidget={openWidget}
      />
      {/* <p>{JSON.stringify(selectedCategories)}</p> */}
      {/* <p>filteredFilmDBIDs</p> <p> {JSON.stringify(filteredFilmDBIDs)}</p> */}
      {/* <p>filtered Film DB List {JSON.stringify(filteredFilmDB)}</p> */}
      <FilmLibrary filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} />
    </div>
  );
}

export default Films;
