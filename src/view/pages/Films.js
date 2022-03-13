import React from "react";
import CategoryWidget from "../../components/category/CategoryWidget";
import FilmLibrary from "../../components/film/FilmLibrary";

function Films() {
  return (
    <div>
      <h1>FilmLibrary</h1>
      <CategoryWidget />
      <FilmLibrary />
    </div>
  );
}

export default Films;
