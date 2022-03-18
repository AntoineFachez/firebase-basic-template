import React, { useRef, useState } from "react";
import "./pages.css";

import VimeoContext from "../../context/VimeoContext";
import ScoutingTool from "../components/scouting-tool/ScoutingTool";
import SignUpLogIn from "../components/user/SignUpLogInOut/SignUpLogIn";
import Footer from "./Footer";

function Home() {
  return (
    <div className="page">
      {/* <h1 className="page-title">Welcome to <code>p00l</code></h1> */}
      {/* <h2>start scouting directors</h2> */}
      {/* <Vimeo /> */}
      <div className="signUp">
        <SignUpLogIn />
      </div>

      {/* <Body /> */}
      <Footer />
    </div>
  );
}

export default Home;
