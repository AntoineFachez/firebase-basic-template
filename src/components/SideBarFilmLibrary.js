import React from "react";
import Tile from "./tile/Tile";
import "./components.css";

function SideBarFilmLibrary({
  data,
  tileWidth,
  tileHeight,
  getClipIndex,
  lightLoad,
}) {
  return (
    <div>
      {data.data ? (
        <ul className="sideBar-film-library">
          {data.data.map((clip) => {
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
                key={data.data[0].clip.uri}
                id={data.data[0].clip.id}
                head={data.data[0].clip.name}
                latLng={data.data[0].clip.latLng}
                clipLink={data.data[0].clip.link}
              />
            </div> */}
        </ul>
      ) : null}
    </div>
  );
}

export default SideBarFilmLibrary;
