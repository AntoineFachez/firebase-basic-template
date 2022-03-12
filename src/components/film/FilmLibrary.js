import React, { useState, useContext } from "react";
// import filmDetails from "./UniversitiyDetails";
import { FilmContext } from "../../context/FilmContext";
import Tile from "../tile/Tile";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "../components.css";

const FilmLibrary = () => {
  const [films, setFilms] = useContext(FilmContext);
  // const [id, setid] = useState();
  const history = useNavigate();
  const tileWidth = "30vw";
  return (
    <div>
      {/* <p className="dev-note">hello from filmsProvider</p> */}

      <div className="widget">
        <h4>Film Library</h4>
        {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
        {/* <ul className="list-container"> */}
        <ul className="film-library-container">
          {films.map((film) => {
            console.log(films[0].film.title);
            return (
              <div className="tile">
                {/* <div className="tile" key={film.id}> */}
                {/* <Link
                  to={`/films/${id}`}
                  onClick={() => history(`/films/${id}`)}
                /> */}

                <Tile
                  key={film.id_film}
                  // head={film.title}
                  head={film.title}
                  // latLng={film.latLng}
                  clipLink={"https://vimeo.com/532350645"}
                  width={tileWidth}
                  // id,
                  // width,
                  // height,
                  // head,
                  // footer,
                  // lightLoad,
                  // clipLink,
                  // getClipIndex,
                />
              </div>
            );
          })}
        </ul>

        <Link className="nav-links" to={ROUTES.FILM_LIBRARY}>
          <li>Film Library</li>
        </Link>
      </div>
    </div>
  );
};

export default FilmLibrary;
