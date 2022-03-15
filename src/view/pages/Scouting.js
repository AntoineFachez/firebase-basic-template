import React from "react";
import Category from "../components/category/Category";
import CategoryWidget from "../components/category/CategoryWidget";
import ScoutingTool from "../components/scouting-tool/ScoutingTool";
import Film from "../components/film/Film";
import GroupList from "../components/group/GroupList";
import FilmLibrary from "../components/film/FilmLibrary";
import FkFilmXfkCateLibrary from "../components/FkFilmXfkCateLibrary";
import MainPlayer from "../components/main-player/MainPlayer";
// import "./pageLayout.css";

function Section() {
  return (
    <div className="">
      {/* <h4>Section 1</h4> */}
      <section className="section1">
        <ScoutingTool />
        {/* <GroupList /> */}
        {/* <CategoryWidget /> */}
      </section>
      {/* <section className="section2"><Film /></section> */}
      {/* <h4>Section 2</h4>
      <section className="section2">
        <FkFilmXfkCateLibrary />
        <FilmLibrary />
      </section>
      <h4>Section 3</h4>
      <section className="section3">
        <GroupList />
      </section> */}
      {/* <section className="section">

      <Pitch />
      <h4>Section</h4>
      </section> */}
      {/* <h4>Section 4</h4>
      <section className="section4">
        <Category />
      </section> */}
    </div>
  );
}

export default Section;
