import { ImageList } from "@mui/material";
import React, { useState } from "react";
import Player from "../Player";
import "./carousel.css";
// import "./main-player.css";
import MainPlayer from "../main-player/MainPlayer";

function Carousel({ data }) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState("20vw");
  const [light, setLight] = useState(true);
  const [playing, setPlaying] = useState();

  const [controls, setControls] = useState(false);
  let sliderWrap = document.querySelector(".slider-wrap");
  let slider = document.querySelector(".slider");
  let clonesWidth;
  let sliderWidth;
  let clones = [];
  let disableYcroll = false;
  let scrollPos;

  let items = [...document.querySelectorAll(".slider-item")];
  let films = [...document.querySelectorAll(".film-div")];

  const loadClipIntoPlayer = (e, index) => {
    //TODO: onClick switch between CategoryLibrary & Carousel
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
    <div className="slider-wrapper">
      <div className="slider">
        {/* ? data.slice(prevClip, nextClip).map((clip) => { */}
        {data
          ? data.map((image, index) => {
              return (
                <div className="slider-item">
                  <div
                    className="img-wrapper"
                    key={index}
                    onClick={(e) => loadClipIntoPlayer(e, index)}
                  >
                    {/* <div className="menu">
                      <button className="menu-btn">watch later</button>
                      <button className="menu-btn">share</button>
                    </div> */}
                    <img
                      //   key={index}
                      className="img"
                      alt="img"
                      src={image.clip.pictures.sizes[3].link}

                      // height={height}
                    />
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      {data ? (
        //TODO: pull out Main Player
        <MainPlayer
          //   clipLink={uiMainPlayerClipId}
          //   load={load}
          playing={playing}
          play={play}
          data={data}
          index={index}
          light={false}
          controls={controls}
          //   loaded={loaded}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Carousel;
