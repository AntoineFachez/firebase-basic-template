import React from "react";
// import Accordion from "../accordionPopup/Accordion";
import "./tile.css";
function TileMenu({ key, footer, getClipIndex, clipLink }) {
  // const handleClick = () => {};
  // console.log(clipLink);
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
    </div>
  );
}

export default TileMenu;
