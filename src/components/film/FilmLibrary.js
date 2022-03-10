import React, { useState, useContext } from "react";
// import filmDetails from "./UniversitiyDetails";
import { FilmContext } from "../../context/FilmContext";
import Tile from "../tile/Tile";
import { Link, useNavigate } from "react-router-dom";
import "../components.css";

const FilmLibrary = () => {
  const [films, setFilms] = useContext(FilmContext);
  const [id, setid] = useState();
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
            return (
              <div className="tile" key={film.id}>
                <Link
                  to={`/films/${id}`}
                  onClick={() => history(`/films/${id}`)}
                />
                <Tile
                  head={film.filmTitle}
                  latLng={film.latLng}
                  clipLink={film.vimeoLink}
                  id={film.id}
                  width={tileWidth}
                />
              </div>
            );
          })}
        </ul>
        <Link to="/film-library">
          <li className="nav-links">Film Library</li>
        </Link>
      </div>
    </div>
  );
};

export default FilmLibrary;
