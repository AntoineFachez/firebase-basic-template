import React, { useRef, useState } from "react";

import VimeoContext from "../../context/VimeoContext";
import ScoutingTool from "../components/scouting-tool/ScoutingTool";
import SignUpLogIn from "../components/user/SignUpLogInOut/SignUpLogIn";
import Footer from "./Footer";
import AnxietyExplosion from "../sketches/AnxietyExplosion";
import ParticlesCircle from "../sketches/ParticlesCircle";
import Tree from "../sketches/Tree";
import "./pages.css";
function Home() {
  return (
    <div className="page">
      {/* <h1 className="page-title">Welcome to <code>p00l</code></h1> */}
      {/* <h2>start scouting directors</h2> */}
      {/* <Vimeo /> */}
      <div className="signUp">
        <SignUpLogIn />
      </div>
      {/* <AnxietyExplosion /> */}
      <ParticlesCircle />
      {/* <Tree /> */}
      {/* <Body /> */}
      <Footer />
    </div>
  );
}

export default Home;
