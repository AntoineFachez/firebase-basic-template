import React from "react";

function TileHead({ head }) {
  const shortHead = head;
  // const shortHead = JSON.stringify(head.split(" "));
  // console.log(head.charAt(5));
  return (
    <div className="tile-head">
      <h3>{shortHead}</h3>
    </div>
  );
}

export default TileHead;
