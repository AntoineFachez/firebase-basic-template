import React from "react";
import { Link, Route, useNavigate } from "react-router-dom";
// import { useState, useContext } from "react";
// import { CityContext, CityProvider } from "../../../contexts/CityContext";
// import { content } from "../accordion/Section";
import TileMenu from "./TileMenu";
import TileBody from "./TileBody";
import TileHead from "./TileHead";
import TileFoot from "./TileFoot";

// import "./kevinPowellTile.css";
import "./tile.css";

const Tile = ({
  key,
  id,
  width,
  height,
  head,
  footer,
  lightLoad,
  clipLink,
  getClipIndex,
  data,
  index,
}) => {
  // console.log(clipLink);
  console.log(key);
  const history = useNavigate();

  return (
    <article className="article" key={id}>
      {" "}
      <div className="gradient">
        {/* <h3>{head}</h3> */}
        {/* <h3>{footer}</h3> */}
        <TileHead head={head} />
        <TileMenu
          key={key}
          id={id}
          getClipIndex={getClipIndex}
          clipLink={clipLink}
          footer={footer}
          data={data}
        />
        <TileBody
          clipLink={clipLink}
          data={data}
          index={index}
          width={width}
          height={height}
          lightLoad={lightLoad}
        />
        {/* <TileFoot footer={footer} /> */}
      </div>
    </article>
    // </Link>
    /* </CityContext> */
  );
};

export default Tile;
