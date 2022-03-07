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
  width,
  height,
  head,
  footer,
  lightLoad,
  clipLink,
  getClipIndex,
}) => {
  // console.log(clipLink);
  const history = useNavigate();

  return (
    <article className="article" key={key}>
      {" "}
      <div className="gradient">
        {/* <h3>{head}</h3> */}
        {/* <h3>{footer}</h3> */}
        <TileHead head={head} />
        <TileMenu
          key={key}
          getClipIndex={getClipIndex}
          clipLink={clipLink}
          footer={footer}
        />
        <TileBody
          clipLink={clipLink}
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
