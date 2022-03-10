import React from "react";
import Tile from "../tile/Tile";
import "../components.css";

function SideBarFilmLibrary({
  data,
  tileWidth,
  tileHeight,
  getClipIndex,
  lightLoad,
}) {
  // console.log(data);
  return (
    <div>
      {data ? (
        <ul className="sideBar-film-library">
          {data.map((clip) => {
            return (
              <div className="tile">
                <Tile
                  // key={id}
                  key={clip.clip.id}
                  width={tileWidth}
                  height={tileHeight}
                  head={clip.clip.name}
                  // latLng={clip.clip.latLng}
                  clipLink={clip.clip.link}
                  // clipLink={clip.id}
                  clipIndex={clip.id}
                  footer={clip.clip.user.name}
                  getClipIndex={getClipIndex}
                  lightLoad={lightLoad}
                />
                {/* link: {clip.clip.link} */}
              </div>
            );
          })}
          {/* <div className="tile">
              <Tile
                key={data[0].clip.uri}
                id={data[0].clip.id}
                head={data[0].clip.name}
                latLng={data[0].clip.latLng}
                clipLink={data[0].clip.link}
              />
            </div> */}
        </ul>
      ) : null}
    </div>
  );
}

export default SideBarFilmLibrary;
