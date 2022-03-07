import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FilmContext } from "../context/FilmContext";

function Film() {
  const [data, setDatas] = useContext(FilmContext);
  return (
    <div className="">
      <h4>Film Component</h4>
      <Link to="/film">
        <li className="nav-links">Film</li>
      </Link>
      {/* {data} */}
    </div>
  );
}

export default Film;
