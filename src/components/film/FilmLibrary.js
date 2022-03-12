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
  const data = films;
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
          {films.slice(0, 9).map((film, index) => {
            {
              /* console.log(films[index].film.link); */
            }

            return (
              <div className="tile">
                {/* <div className="tile" key={films.film.id}> */}
                {/* <Link
                  to={`/films/${id}`}
                  onClick={() => history(`/films/${id}`)}
                /> */}

                <Tile
                  key={index}
                  id={film.id_film}
                  head={film.film.title}
                  clipLink={film.film.link}
                  // latLng={film.film.latLng}
                  // clipLink={"https://vimeo.com/532350645"}
                  width={tileWidth}
                  data={data}
                  index={index}
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
