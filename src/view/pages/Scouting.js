import React, { useContext, useEffect, useState } from "react";
import ScoutingTool from "../components/scouting-tool/ScoutingTool";
import { FilmContext } from "../../context/FilmContext";
import ParticlesCircle from "../../view/sketches/ParticlesCircle";
// import Category from "../components/category/Category";
// import CategoryWidget from "../components/category/CategoryWidget";
// import Film from "../components/film-library/Film";
// import GroupList from "../components/group/GroupList";
// import FilmLibrary from "../components/film-library/FilmLibrary";
// import FkFilmXfkCateLibrary from "../components/FkFilmXfkCateLibrary";
// import MainPlayer from "../components/main-player/MainPlayer";
// import { CategoryContext } from "../../context/CategoryContext";
// import Feed from "../components/scouting-tool/ScoutingTool";
// import Carousel from "../components/carousel/Carousel";
// import "./pageLayout.css";
function Section() {
  // const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [filmDB, setFilmDB] = useContext(FilmContext);
  // const [feed, setFeed] = useState(
  //   JSON.parse(localStorage.getItem("feed")) || []
  // );
  const [loading, setLoading] = useState(false);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [index, setIndex] = useState(0);
  // const [playing, setPlaying] = useState();
  const [hide, setHide] = useState(true);
  // const [controls, setControls] = useState(false);
  console.log(hide);
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
                filteredFilmDB.push(found);
                removeDuplicates(filteredFilmDB);
              }
            });
          }
        });
      });
    }
  };
  const removeDuplicates = (arr) => {
    arr.filter((item, index) => arr.indexOf(item) === index);
  };
  filteredFilmsByCatgory(filmDB, selectedCategories);

  // const loadClipIntoPlayer = (e, index) => {
  //   e.preventDefault();
  //   setIndex(index);
  //   setPlaying(true);
  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: 350,
  //       behavior: "smooth",
  //     });
  //   }, 1500);
  // };
  // const getSelectedCategories = (e) => {
  //   setSelectedCategories(e);
  // };
  const defaultFilmList = () => {
    setFilmDB(filmDB.slice(0, 9).map((film, index) => ""));
    console.log(filmDB);
  };
  useEffect(() => {
    if (!selectedCategories) {
      defaultFilmList();
    }
    setFilteredFilmDB([]);

    return () => {};
  }, [selectedCategories]);

  return (
    <div className="">
      <h1>Scouting Vimeo</h1>
      {loading ? <ParticlesCircle /> : ""}
      <ScoutingTool loading={loading} setLoading={setLoading} />
      <section className="section1">
        {/* <div className="carousel">
          <Carousel data={feed.data} loadClipIntoPlayer={loadClipIntoPlayer} />
        </div> */}
        <div className="main-player">
          {/* <MainPlayer
            // clipLink={uiMainPlayerClipId}
            //   load={load}
            playing={playing}
            // play={play}
            feed={feed.data}
            index={index}
            light={false}
            controls={controls}
            //   loaded={loaded}
          /> */}
        </div>
        {/* <button
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
          // selectedFilmCategoriesID={selectedFilmCategoriesID}
        /> */}

        {/* <GroupList /> */}
        {/* <CategoryWidget /> */}
      </section>
      {/* <FilmLibrary filteredFilmDB={filteredFilmDB} setFilmDB={setFilmDB} /> */}
    </div>
  );
}

export default Section;
