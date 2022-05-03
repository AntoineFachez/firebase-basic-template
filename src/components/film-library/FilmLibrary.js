//
//
//
//Clones Tutorial
//https://www.youtube.com/watch?v=6qf3_KAAVQA&list=PLvW9K-r9avwr-bXLAEbiHN_V9UbpZfcfc&index=201

import React, { useState, useContext, useEffect } from "react";
// import filmDetails from "./UniversitiyDetails";
import { FilmContext } from "../../context/FilmContext";
import Tile from "../tile/Tile";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./film-library.css";
import Carousel from "../carousel/Carousel";

const FilmLibrary = ({ filteredFilmDB }) => {
  // const [filteredFilmDB, setFilteredFilmDB] = useState(
  //   JSON.parse(localStorage.getItem("filteredDB")) || []
  // );
  // console.log(filteredFilmDB[0]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState();
  // useEffect(() => {
  //   setFilteredFilmDB([]);
  // }, []);
  // const [films, setFilms] = useContext(FilmContext);
  // const [searchTerm, setSearchTerm] = useState("");
  const [FilteredFilmList, setFilteredFilmList] = useState([]);
  const [error, setError] = useState(null);
  // const [id, setid] = useState();
  const data = filteredFilmDB;

  const history = useNavigate();
  const tileWidth = "30vw";
  const tileHeight = "30vw";

  useEffect(() => {
    // setUpEndlessScroll();

    return () => {};
  }, []);

  const searchCategory = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm) {
      function buildList(arr) {
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
      buildList([filteredFilmDB]);
    }
    if (JSON.stringify(filteredFilmDB) !== -1) {
      setError("prevent redundancy");

      var filteredArray = FilteredFilmList.filter(
        (ele) => ele.trim() !== searchTerm.trim()
      );

      setFilteredFilmList(filteredArray);
      // setSearchTerm(searchTerm);
      setError(null);
    } else {
      // setFilteredFilmList((FilteredFilmList) => [
      //   ...FilteredFilmList,
      //   elementID + " ",
      // ]);
    }
  };
  const loadClipIntoPlayer = (e, index) => {
    e.preventDefault();
    setIndex(index);
    setPlaying(true);
    setTimeout(() => {
      window.scrollTo({
        top: 350,
        behavior: "smooth",
      });
    }, 1500);
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
        {/* {searchTerm} */}
        {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
        {/* <ul className="list-container"> */}
        <ul className="film-library-container">
          {filteredFilmDB.slice(0, 9).map((film, index) => {
            /* console.log(films[index].film.link); */

            return (
              <div className="tileInGrid" key={index}>
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
                  height={tileHeight}
                  data={data}
                  // index={key}
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
