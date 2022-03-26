import React, { useState } from "react";
import Player from "../player/Player";

import "./carousel.css";

function Carousel({
  data,
  dataFilmLibrary,
  loadClipIntoPlayer,
  filteredFilmDB,
}) {
  // console.log(filteredFilmDB[0].film.thumbnail);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState();
  const [controls, setControls] = useState(false);
  const [width, setWidth] = useState("20vw");
  const [light, setLight] = useState(true);

  let sliderWrap = document.querySelector(".slider-wrap");
  let slider = document.querySelector(".slider");
  let clonesWidth;
  let sliderWidth;
  let clones = [];
  let disableYcroll = false;
  let scrollPos;

  let items = [...document.querySelectorAll(".slider-item")];
  let films = [...document.querySelectorAll(".film-div")];

  const play = () => {
    // e.preventDefault();
    playing ? setPlaying(true) : setPlaying(false);
    console.log(playing);
  };

  // console.log(data.clip.user.name);
  return (
    <div className="carousel">
      <div className="slider">
        {/* ? data.slice(prevClip, nextClip).map((clip) => { */}
        {data
          ? data?.map((image, index) => {
              return (
                <div key={index} className="slider-item">
                  <div
                    className="img-wrapper"
                    //TODO: onClick switch between CategoryLibrary & Carousel
                    onClick={(e) => loadClipIntoPlayer(e, index)}
                  >
                    <div className="menu">
                      <li className="user">{image.clip.user.name}</li>
                      {/* <button className="menu-btn">watch later</button> */}
                      {/* <button className="menu-btn">share</button> */}
                    </div>
                    <img
                      //   key={index}
                      className="img"
                      alt="img"
                      src={image.clip.pictures.sizes[3].link}
                    />
                  </div>
                </div>
              );
            })
          : filteredFilmDB?.map((film, index) => {
              return (
                <div key={index} className="slider-item">
                  <div
                    className="img-wrapper"
                    //TODO: onClick switch between CategoryLibrary & Carousel
                    onClick={(e) => loadClipIntoPlayer(e, index)}
                  >
                    <div className="menu">
                      <li className="user">{film.film.postingAccount}</li>
                      {/* <button className="menu-btn">watch later</button> */}
                      {/* <button className="menu-btn">share</button> */}
                    </div>
                    <Player
                      width={width}
                      // feed={feed}
                      index={index}
                      // height={mainPlayerHeight}
                      // height={height}
                      light={false}
                      autoPlay={playing}
                      controls={controls}
                      playing={playing}
                      volume={0.0}
                      clipLink={film.film.link}
                    />
                    {/* <img
                      //   key={index}
                      className="img"
                      alt="img"
                      src={image.film.thumbnail}
                    /> */}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default Carousel;
