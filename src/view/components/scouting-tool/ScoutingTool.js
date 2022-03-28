import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Carousel from "../carousel/Carousel";
import CategoryWidget from "../category/CategoryWidget";
import MainPlayer from "../main-player/MainPlayer";
import { CategoryContext } from "../../../context/CategoryContext";
import { FilmContext } from "../../../context/FilmContext";
import FilmLibrary from "../film-library/FilmLibrary";

import ParticlesCircle from "../../sketches/ParticlesCircle";
import "./scouting-tool.css";
// import "../../../index.css";

const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";
const FeedList = ({ loading, setLoading }) => {
  const [filmDB, setFilmDB] = useContext(FilmContext);
  const loader = document.querySelector("#loading");
  const [token, setToken] = useState("");
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  const [feed, setFeed] = useState(
    JSON.parse(localStorage.getItem("feed")) || []
  );
  const [loaded, setLoaded] = useState(false);
  const [uiMainPlayerClipId, setUiMainPlayerClipId] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredFilmDB, setFilteredFilmDB] = useState([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState();
  const [light, setLight] = useState(true);
  const [controls, setControls] = useState(false);
  const [hide, setHide] = useState(true);
  const [selectedFilmCategoriesID, setSelectedFilmCategoriesID] = useState([]);
  const [selectedFilmCategoriesNames, setSelectedFilmCategoriesNames] =
    useState([]);
  const [selectedid_cate, setSelectedid_cate] = useState();
  const [error, setError] = useState(null);
  const tileWidth = "30vw";
  const tileHeight = "7vh";
  const mainPlayerWidth = "200%";
  const lightLoad = true;
  const [filmCategories, setFilmCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadVimeo = () => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    } else {
      setFeed("");
    }
  };
  const VIMEO_THUMBNAIL_ENDPOINT =
    "https://api.vimeo.com/videos/{video_id}/pictures";

  const handleGetFeed = async () => {
    setLoading(true);
    setLoaded(false);

    //TODO: refacror if offline
    // if (localStorage.getItem("feed").length === 0) {
    loadVimeo();
    axios
      .get(await FEED_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
        setLoaded(true);
        localStorage.setItem("feed", JSON.stringify(res.data));
        console.log(localStorage.getItem("feed"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setHide(true);
    if (!localStorage.getItem("feed")) {
      handleGetFeed();
    } else {
      //TODO: make dependent on last pull from Vimeo. Otherwise the localStorage stays the same.SetTimeOut 15 Minutes or so. Or trigger API @Vimeo as soon as a new video appears in feed…
      localStorage.getItem("feed");
    }
  }, [token]);

  const getClipIndex = (clipLink) => {
    setUiMainPlayerClipId(clipLink);
  };

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
  const selectCategory = (selectedElementID, cateName) => {
    console.log(selectedElementID);
    setSelectedid_cate(selectedElementID);
    if (
      JSON.stringify(selectedFilmCategoriesID).indexOf(selectedElementID) !== -1
    ) {
      setError("prevent redundancy");

      var filteredArrayID = selectedFilmCategoriesID.filter(
        (ele) => ele.trim() !== selectedElementID.trim()
      );
      var filteredArrayNames = selectedFilmCategoriesNames.filter(
        (ele) => ele.trim() !== cateName.trim()
      );

      setSelectedFilmCategoriesID(filteredArrayID);
      setSelectedFilmCategoriesNames(filteredArrayNames);
      setError(null);
    } else {
      document
        .getElementById(selectedElementID)
        .classList.add("element-highlighted");

      setSelectedFilmCategoriesID((filmCategoriesID) => [
        ...filmCategoriesID,
        selectedElementID,
      ]);
      setSelectedFilmCategoriesNames((filmCategoriesNames) => [
        ...filmCategoriesNames,
        cateName,
      ]);
      // .classList.add("element-highlighted");
    }
  };

  const getSelectedCategories = (e) => {
    setSelectedCategories(e);
  };
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

  function clearCategories() {
    setFilmCategories("");
    setSearchTerm("");
    console.log("clicked");
    // setError(null);
  }

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

  useEffect(() => {
    if (!selectedCategories) {
      defaultFilmList();
    }
    setFilteredFilmDB([]);

    return () => {};
  }, [selectedCategories]);

  filteredFilmsByCatgory(filmDB, selectedCategories);
  return (
    <div className="scout-container">
      {/* //TODO: pull out LOADING and into NavBar next to Vimeo or around the VimeoLogo */}
      <div className="loader">
        {/* {feed.data || loading ? (
          ""
        ) : (
          <button className="btn-get-feed" onClick={handleGetFeed}>
            get Feed
          </button>
        )} */}
        {/* <div id="loading" onClick={handleGetFeed}></div> */}
        {/* {loading ? <ParticlesCircle /> : ""} */}
      </div>

      {/* <SideBarFilmLibrary
        data={data.data}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        getClipIndex={getClipIndex}
        lightLoad={lightLoad}
      /> */}
      {feed.data ? (
        <>
          <section className="high">
            <div className="carousel">
              <Carousel
                data={feed.data}
                loadClipIntoPlayer={loadClipIntoPlayer}
              />
            </div>
          </section>
          <section className="low">
            <div className="main-player">
              <MainPlayer
                //   clipLink={uiMainPlayerClipId}
                //   load={load}
                playing={playing}
                // play={play}
                feed={feed.data}
                index={index}
                light={false}
                controls={controls}
                //   loaded={loaded}
              />
            </div>
            <button
              className="btn"
              onClick={() => {
                openWidget
                  ? openWidget().setOpenCategoryWidget(false)
                  : openWidget().setOpenCategoryWidget(true);
              }}
            >
              X
            </button>
            <div className="category-widget">
              <CategoryWidget
                categoriesDB={categoriesDB}
                setCategoriesDB={setCategoriesDB}
                getSelectedCategories={getSelectedCategories}
                hide={hide}
                openWidget={openWidget}
                // selectedFilmCategoriesID={selectedFilmCategoriesID}
              />
            </div>
            {/* <FilmLibrary
              filteredFilmDB={filteredFilmDB}
              setFilmDB={setFilmDB}
            /> */}
            <Carousel
              filteredFilmDB={filteredFilmDB}
              // data={feed.data}
              loadClipIntoPlayer={loadClipIntoPlayer}
            />
          </section>
        </>
      ) : (
        ""
      )}
      {/* <div className="tools">
          <Accordion />
        </div>{" "} */}

      <section></section>
    </div>
  );
};

export default React.memo(FeedList, () => (data) => {
  return data === localStorage.getItem("localStorageData");
});
//  <Link to={`/feeds/${id}`} onClick={() => history(`/feeds/${id}`)} />;
