import React, { useRef, useState } from "react";
import "./pages.css";
import Body from "../layout/Body";
import VimeoContext from "../../context/VimeoContext";
import VimeoFeed from "../../components/ScoutingTool";
import SignUpLogIn from "../../components/user/SignUpLogInOut/SignUpLogIn";

function Home() {
  return (
    <div className="page">
      <h1>Welcome to p001</h1>

      {/* <h2>start scouting directors</h2> */}
      {/* <Vimeo /> */}
      <SignUpLogIn />
      {/* <Body /> */}
    </div>
  );
}

export default Home;
