// import { flexbox } from "@mui/system";
import React from "react";
import Player from "../player/Player";
import "./tile.css";

function TileBody({ data, index, lightLoad, clipLink, width, height }) {
  // const cities = CitiesData;
  // console.log(clipLink);
  return (
    <div
      className="tile-body"
      // style={{
      //   borderRadius: "0rem 0rem 1rem 1rem",
      //   height: "18rem",
      // }}
    >
      {/* <li>{picURL}</li> */}
      {/* <div
        className="iframe"
        style={{
          margin: "0 auto",
          display: "block-inline",

          borderStyle: "none",
          allowtransparency: "1",
          // width: "12rem",
          // allow: "fullscreen",
          referrerpolicy: "strict-origin",
        }}
      > */}
      <div className="player-wrapper">
        <Player
          // height={mainPlayerHeight}
          height={height}
          width={width}
          light={false}
          data={data}
          index={index}
          // autoPlay={playing}
          // controls={controls}
          // playing={playing}
          // volume={0.0}
          // clipLink={data[index].clip.link}
          clipLink={clipLink}
        />
      </div>{" "}
      {/* <Player
        clipLink={clipLink}
        controls="true"
        onProgress="played"
        // autoplay="false"
        volume="0.3"
        width={width}
        // style={{ height: height }}
        height={height}
        light={lightLoad}
      /> */}
      {/* <iframe className="crop ratio ratio-1:1" src={clipLink}></iframe> */}
      {/* </div> */}
    </div>
  );
}

export default TileBody;
