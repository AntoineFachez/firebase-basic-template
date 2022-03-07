import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBarFilmLibrary from "./SideBarFilmLibrary";
import Carousel from "./carousel/Carousel";
import "./components.css";
import "./vimeo-feed.css";
import CategoryWidget from "./category/CategoryWidget";
import MainPlayer from "./main-player/MainPlayer";

const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";

const FeedList = () => {
  const history = useNavigate();
  const loader = document.querySelector("#loading");
  const [uiMainPlayerClipId, setUiMainPlayerClipId] = useState(null);
  const [defaultLink, setDefaultLink] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const tileWidth = "30vw";
  const tileHeight = "7vh";
  const mainPlayerWidth = "200%";
  const lightLoad = true;
  const [light, setLight] = useState(true);
  const [playing, setPlaying] = useState();
  const [controls, setControls] = useState(false);

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
    console.log(loading);
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
        console.log(loading);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadVimeo();
    handleGetFeed();
  }, []);

  const getClipIndex = (clipLink) => {
    setUiMainPlayerClipId(clipLink);
    window.scrollTo(0, 0);
  };
  const handleClick = (e, index) => {
    e.preventDefault();
    setIndex(index);
    setPlaying(true);
    console.log(playing);
  };
  const play = () => {
    // e.preventDefault();
    playing ? setPlaying(true) : setPlaying(false);
    console.log(playing);
  };
  return (
    <div>
      {/* //TODO: pull out LOADING and into NavBar next to Vimeo or around the VimeoLogo */}
      {loaded ? "" : <button onClick={handleGetFeed}>get Feed</button>}
      {loading ? <circle id="loading" onClick={handleGetFeed}></circle> : ""}
      {/* <div id="loading"></div> */}
      {/* <SideBarFilmLibrary
        data={data}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        getClipIndex={getClipIndex}
        lightLoad={lightLoad}
      /> */}
      <div className="carousel">
        <CategoryWidget />
      </div>
      <div className="main-player-container">
        <Carousel data={data.data} />
      </div>
      <section>
        {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
        {/* {data ? (
          <MainPlayer
            //   clipLink={uiMainPlayerClipId}
            //   load={load}
            playing={playing}
            play={play}
            data={data}
            handleClick={handleClick}
            index={index}
            light={false}
            controls={controls}
            //   loaded={loaded}
          />
        ) : (
          ""
        )} */}
      </section>
    </div>
  );
};

export default FeedList;
//  <Link to={`/feeds/${id}`} onClick={() => history(`/feeds/${id}`)} />;
