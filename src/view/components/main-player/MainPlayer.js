import React, { useEffect, useState } from "react";
import Player from "../player/Player";
import "../components.css";
import "./main-player.css";

function MainPlayer({
  load,
  loaded,
  feed,
  index,
  clipLink,
  controls,
  playing,
  play,
  pause,
  loadClipIntoPlayer,
}) {
  // console.log(feed[index].clip.link);
  console.log(feed);
  const mainPlayerWidth = "20vw";
  // const cateWidgetWidth = "20vw";
  const [targetClip, setTargetClip] = useState("");
  const [carouselOffSet, setCarouselOffSet] = useState(1);
  const [width, setWidth] = useState("80vw");
  // const [playing, setPlaying] = useState(false);
  const [height, setHeight] = useState("40vw");
  const [light, setLight] = useState(true);

  const prevClip = targetClip - carouselOffSet;
  const nextClip = targetClip + carouselOffSet - 1;

  const playClip = () => {
    // e.preventDefault();
    play();
    console.log(playing);
  };

  const pauseClip = () => {
    // e.preventDefault();
    pause();
    console.log(playing);
  };

  return (
    <div className="main-player-container">
      <li>{}</li>
      <div className="player-wrapper">
        <Player
          width={width}
          feed={feed}
          index={index}
          // height={mainPlayerHeight}
          // height={height}
          light={false}
          autoPlay={playing}
          controls={controls}
          playing={playing}
          volume={0.0}
          clipLink={feed[index].clip.link}
        />
      </div>
      {playing ? (
        <button className="pause-btn" onClick={pauseClip}>
          pause
        </button>
      ) : (
        <button className="pause-btn" onClick={playClip}>
          play
        </button>
      )}
    </div>
  );
}

export default MainPlayer;
