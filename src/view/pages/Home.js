import React, { useRef, useState } from "react";
import VimeoContext from "../../context/VimeoContext";
import ScoutingTool from "../components/scouting-tool/ScoutingTool";
import SignUpLogIn from "../components/user/SignUpLogInOut/SignUpLogIn";
import Footer from "./Footer";
import AnxietyExplosion from "../sketches/AnxietyExplosion";
import ParticlesCircle from "../sketches/ParticlesCircle";
import ExplodingTypo from "../sketches/ExplodingTypo";
import FireSparks from "../sketches/FireSparks";
import NoizyText from "../sketches/NoizyText";
import Tree from "../sketches/Tree";
import MovingTypoGenerative from "../sketches/MovingTypoGenerative";
import RasterizeImage from "../sketches/RasterizeImage";

import NoizyCircle from "../sketches/NoizyCircle";
import "./pages.css";
function Home() {
  return (
    <div className="page">
      {/* <h1 className="page-title">Welcome to <code>p00l</code></h1> */}
      {/* <h2>start scouting directors</h2> */}
      {/* <Vimeo /> */}
      {/* <div className="signUp">
        <SignUpLogIn />
      </div> */}
      {/* <AnxietyExplosion /> */}
      {/* <ExplodingTypo /> */}
      {/* <FireSparks /> */}
      {/* <Tree /> */}
      {/* <NoizyText /> */}
      {/* <MovingTypoGenerative /> */}
      {/* <RasterizeImage /> */}
      <div className="signUp">
        <SignUpLogIn />
      </div>
      <div className="sketch">
        <NoizyCircle />
      </div>

      {/* <Body /> */}
      <Footer />
    </div>
  );
}

export default Home;
