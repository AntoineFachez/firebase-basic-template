import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBarFilmLibrary from "./film/SideBarFilmLibrary";
import Carousel from "./carousel/Carousel";
import CategoryWidget from "./category/CategoryWidget";
import MainPlayer from "./main-player/MainPlayer";
// import "./components.css";
import "./scouting-tool.css";
import "../index.css";

const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";

const FeedList = () => {
  const history = useNavigate();
  const loader = document.querySelector("#loading");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [uiMainPlayerClipId, setUiMainPlayerClipId] = useState(null);
  const [defaultLink, setDefaultLink] = useState("");
  const [index, setIndex] = useState(0);
  const [light, setLight] = useState(true);
  const [controls, setControls] = useState(false);
  const [playing, setPlaying] = useState();
  const [hide, setHide] = useState(true);

  const tileWidth = "30vw";
  const tileHeight = "7vh";
  const mainPlayerWidth = "200%";
  const lightLoad = true;

  useEffect(() => {
    handleGetFeed();
  }, [token]);

  const loadVimeo = () => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    } else {
      setData("");
    }
  };

  const handleGetFeed = async () => {
    // displayLoading();
    setLoading(true);
    setLoaded(false);
    // displayLoading();
    // console.log(loading);
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
        localStorage.setItem("localStorageData", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data.data);
  useEffect(
    () => {
      loadVimeo();
      setHide(true);
    },
    // setData(handleGetFeed()),
    []
  );

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
    // console.log(document.classList.contains("foo"));
    // console.log(hide);

    // openCategoryWidget ? setWidth("15vw") : setWidth("20vw");
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
              <CategoryWidget hide={hide} openWidget={openWidget} />
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
