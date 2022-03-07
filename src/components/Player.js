import React, { useState } from "react";
import ReactPlayer from "react-player";
// import "./vimeo-player.css";
// import RestAPI from "./RestAPI";
// import { autoplay } from "vimeo";

const Player = ({
  width,
  height,
  light,
  clipLink,
  playing,
  controls,
  volume,
}) => {
  const [watchComplete, setWatchComplete] = useState(false);
  const handleWatchComplete = ({ played }) => {
    if (played >= 0.2 && !watchComplete) {
      setWatchComplete(true);
    }
  };

  return (
    <div className="player">
      {/* <button className="btn-play" onClick={playVideo}>
        play
      </button> */}

      <ReactPlayer
        // className="react-player"
        url={clipLink}
        width={width}
        height={height}
        controls={controls}
        playing={playing}
        volume={volume}
        onProgress={handleWatchComplete}
        stopOnUnmount={true}
        light={light}
        // speed={true}
        // title={true}
        // transparent={true}
        // pip={true}
        autoPlay={false}
        // autopause={true}
        // background={true}
      />
      <div
        className={
          watchComplete
            ? "marker marker--is-complete"
            : "marker marker--not-complete"
        }
      >
        {/* Completed */}
      </div>
      {/* <RestAPI /> */}
    </div>
  );
};

export default Player;
