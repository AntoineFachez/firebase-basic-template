import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Carousel from "../../components/carousel/Carousel";
import CategoryWidget from "../../components/category/CategoryWidget";
import MainPlayer from "../../components/main-player/MainPlayer";

import "./scouting-tool.css";
import "../../../index.css";

const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";

const FeedList = () => {
  const loader = document.querySelector("#loading");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [uiMainPlayerClipId, setUiMainPlayerClipId] = useState(null);

  const [index, setIndex] = useState(0);
  const [light, setLight] = useState(true);
  const [controls, setControls] = useState(false);
  const [playing, setPlaying] = useState();
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

  const loadVimeo = () => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    } else {
      setData("");
    }
  };

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
        setData(res.data);
        setLoading(false);
        setLoaded(true);
        localStorage.setItem("feed", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    //TODO: refactor to if offline
    //else {
    //   localStorage.getItem("feed");
    // }
  };

  useEffect(() => {
    setHide(true);
    handleGetFeed();
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
        document.querySelector(".category-widet").classlist.add(".small-widge")
      : setHide(true) &&
        document.querySelector(".smal-widget").classlist.add(".category-wid");
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

  return (
    <div className="scout-container">
      {/* //TODO: pull out LOADING and into NavBar next to Vimeo or around the VimeoLogo */}
      <div className="loader">
        {data.data || loading ? (
          ""
        ) : (
          <button className="btn-get-feed" onClick={handleGetFeed}>
            get Feed
          </button>
        )}
        {loading ? <div id="loading" onClick={handleGetFeed}></div> : ""}
      </div>

      {/* <SideBarFilmLibrary
        data={data.data}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        getClipIndex={getClipIndex}
        lightLoad={lightLoad}
      /> */}
      {data.data ? (
        <>
          <section className="high">
            <div className="carousel">
              <Carousel
                data={data.data}
                loadClipIntoPlayer={loadClipIntoPlayer}
              />
            </div>
          </section>
          <section className="low">
            <div className="category-widget">
              <CategoryWidget
                hide={hide}
                openWidget={openWidget}
                selectedFilmCategoriesID={selectedFilmCategoriesID}
              />
            </div>
            <div className="main-player">
              <MainPlayer
                //   clipLink={uiMainPlayerClipId}
                //   load={load}
                playing={playing}
                // play={play}
                data={data.data}
                index={index}
                light={false}
                controls={controls}
                //   loaded={loaded}
              />
            </div>
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
