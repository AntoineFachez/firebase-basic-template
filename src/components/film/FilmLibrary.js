import React, { useState, useContext, useEffect } from "react";
// import filmDetails from "./UniversitiyDetails";
import { FilmContext } from "../../context/FilmContext";
import Tile from "../tile/Tile";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "../components.css";

const FilmLibrary = () => {
  // useEffect(() => {

  // }, []);
  const [films, setFilms] = useContext(FilmContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredFilmList, setFilteredFilmList] = useState([]);
  const [error, setError] = useState(null);
  // const [id, setid] = useState();
  const data = films;
  const history = useNavigate();
  const tileWidth = "30vw";

  const searchCategory = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm) {
      function multiplyAll(arr) {
        let element;
        let result = [];
        let includesSearchTerm = [];
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            // console.log(arr[i][j]);
            for (let k = 0; k < arr[i][j].film.filmXcate.length; k++) {
              // console.log(arr[i][j].film.filmXcate[k].cate.length);
              for (
                let l = 0;
                l < arr[i][j].film.filmXcate[k].cate.length;
                l++
              ) {
                // console.log(arr[i][j].film.filmXcate[k].cate[l].cateName);
                element = arr[i][j].film.filmXcate[k].cate[l].cateName;
                // const includesSearchTerm = result.includes(element);
                if (element.includes(searchTerm)) {
                  result.push(element);
                  console.log(element);
                }
              }
            }
          }
        }
        console.log(result);
        // Only change code above this line
        // console.log(includesSearchTerm);
        return includesSearchTerm;
      }
      multiplyAll([films]);
    }
    // multiplyAll([films]);

    // console.log(films[0].film.filmXcate[0].cate[0].cateName);
    // console.log(films[0].film.filmXcate[0]);
    // let filmArray = films.film;
    // let amountFilms = films.length;
    // for (let i = 0; i < amountFilms; i++) {
    //   let amountFilmXCate = filmArray[i];
    //   console.log(amountFilmXCate);
    // }
    // useEffect(() => {

    // }, []);
    // for (let i = 0; i < films.length; i++) {
    //   let filmsArray = films[i].length;
    //   console.log(i, filmsArray);
    //   for (let j = 0; j < filmsArray; j++) {
    //     console.log(filmsArray[i][j].filmXcate[0].cate[0].cateName);
    //   }
    //   const filmCate = films[i].film;
    // }

    // const elementName = category;
    if (JSON.stringify(films) !== -1) {
      setError("prevent redundancy");

      var filteredArray = FilteredFilmList.filter(
        (ele) => ele.trim() !== searchTerm.trim()
      );
      // console.log(element);
      // console.log(FilteredFilmList[0]);
      // console.log(filteredArray);
      // console.log(element);
      setFilteredFilmList(filteredArray);
      setSearchTerm(searchTerm);
      setError(null);
    } else {
      // setFilteredFilmList((FilteredFilmList) => [
      //   ...FilteredFilmList,
      //   elementID + " ",
      // ]);
    }
  };

  return (
    <div>
      {/* <p className="dev-note">hello from filmsProvider</p> */}

      <div className="widget">
        <h4>Film Library</h4>
        {/* <input
          className="input"
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => {
            searchCategory(e.target.value);
          }}
        /> */}
        {searchTerm}
        {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
        {/* <ul className="list-container"> */}
        <ul className="film-library-container">
          {films.slice(0, 9).map((film, index) => {
            /* console.log(films[index].film.link); */

            return (
              <div className="tile" key={index}>
                {/* <div className="tile" key={films.film.id}> */}
                {/* <Link
                  to={`/films/${id}`}
                  onClick={() => history(`/films/${id}`)}
                /> */}

                <Tile
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
