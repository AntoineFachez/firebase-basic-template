import React from "react";
// import Accordion from "../accordionPopup/Accordion";
import "./tile.css";
function TileMenu({ key, id, data, footer, getClipIndex, clipLink }) {
  // const handleClick = () => {};
  console.log(key);
  // console.log(data[key].film.reel[0].prof);
  return (
    <div className="tile-menu">
      {/* <menu> */}
      {/* <div className="tile-tools"><Accordion /></div> */}

      <button className="btn-tile-menu">{footer}</button>

      <button className="btn-tile-menu" onClick={() => getClipIndex(clipLink)}>
        categorize
      </button>

      <button className="btn-tile-menu">save</button>
      {/* </menu> */}
      {data ? (
        <ul>
          {/* <li>{data[0].film.reel[0].prof}</li>
          <li>{data[0].film.reel[0].name}</li> */}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default TileMenu;
