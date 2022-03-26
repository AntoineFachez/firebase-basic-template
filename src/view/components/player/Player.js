import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Button from "../button/Button";
import Spinner from "./Spinner";
// import "./vimeo-player.css";
// import RestAPI from "./RestAPI";

const Player = ({
  width,
  height,
  light,
  clipLink,
  // playing,
  controls,
  volume,
  data,
  index,
  filteredFilmDB,
}) => {
  // console.log(clipLink);
  // const link = data[index].clip.link;
  // console.log(films[0].film.link);
  // console.log(clipLink);
  // const [loaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState("");
  const [playing, setPlaying] = useState(false);
  const [playedTime, setPlayedTime] = useState("");
  const [watchComplete, setWatchComplete] = useState(false);
  const title = true;
  const background = true;
  const [nearlyWatchComplete, setNearlyWatchComplete] = useState(false);
  const buttonTexts = ["play", "pause"];
  const buttonText = () => {
    const text = playing ? buttonTexts[0] : buttonTexts[1];
  };

  // useEffect(() => {
  //   setWatchComplete(false);
  //   setPlayedTime("");
  //   setDuration("");

  //   const id = link.split("com/")[1];
  //   // console.log(id);
  //   fetch(`https://vimeo.com/api/v2/video/${id}.json`).then((response) =>
  //     response.json()
  //   );
  //   // .then((data) => console.log(data));

  //   // setLoaded(false);
  // }, [clipLink]);

  const handleMediaData = ({ onDuration, played, playedSeconds }) => {
    if (played <= 0.4 && !watchComplete) {
      setNearlyWatchComplete(false);
    }
    if (played >= 0.8 && !watchComplete) {
      setNearlyWatchComplete(true);
    }
    setPlayedTime(playedSeconds);
    setDuration(onDuration);
    if (played >= 1 && !watchComplete) {
      setWatchComplete(true);
    }
    setPlayedTime(playedSeconds);
    setDuration(onDuration);
  };

  const playClip = () => {
    playing ? setPlaying(false) : setPlaying(true);
  };
  const onDuration = ({ onDuration }) => {
    setDuration(onDuration);
  };
  // const onReady = setLoaded(true);

  return (
    <div className="player">
      <Button
        className="btn-play"
        buttonAction={playClip}
        buttonText={buttonTexts[0]}
      />
      {/* {loaded ? "" : <Spinner />} */}

      <ReactPlayer
        // className="react-player"
        url={clipLink}
        // onReady={onReady}
        width={width}
        height={height}
        controls={controls}
        playing={playing}
        // onPlay={handleWatchComplete}
        volume={volume}
        onDuration={onDuration}
        onProgress={handleMediaData}
        stopOnUnmount={true}
        light={light}
        loaded={<Spinner />}
        // speed={true}
        // title={title}
        // transparent={true}
        // pip={true}
        // autoPlay={false}
        // autopause={true}
        // background={background}
      />
      {duration}
      {playedTime}
      <div
        className={
          watchComplete
            ? "marker marker--is-complete"
            : "marker marker--is-nearlycomplete"
        }
      >
        {watchComplete ? "completed" : ""}
      </div>
      <div className={""}></div>
      {/* <RestAPI /> */}
    </div>
  );
};

export default Player;
