import React, { useRef, useState } from "react";
import Footer from "./Footer";
import BasicImage from "../sketches/BasicImage";

import "./pages.css";
function Home() {
  const clicked = () => {
    console.log("clicked");
  };
  return (
    <div className="page">
      <div className="sketch" onClick={clicked}>
        {/* <BasicImage /> */}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
