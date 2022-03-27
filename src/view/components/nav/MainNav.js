import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import logo from "../../../images/p00l glow Square small.png";
import SignUpLogIn from "../user/SignUpLogInOut/SignUpLogIn";
import { VimeoLogIn } from "../VimeoLogIn";
import NeonText from "../../sketches/NeonText";
import "./main-nav.css";

export default function MainNav() {
  const [isShrunk, setShrunk] = useState(false);

  const clicked = () => {
    console.log("clicked");
  };

  // useEffect(() => {
  //   const handler = () => {
  //     setShrunk((isShrunk) => {
  //       if (
  //         !isShrunk &&
  //         (document.body.scrollTop > 10 ||
  //           document.documentElement.scrollTop > 10)
  //       ) {
  //         return true;
  //       }
  //       if (
  //         isShrunk &&
  //         document.body.scrollTop < 4 &&
  //         document.documentElement.scrollTop < 4
  //       ) {
  //         return false;
  //       }
  //       return isShrunk;
  //     });
  //   };
  //   // Previous logic.
  // }, []);

  return (
    <nav className="main-nav">
      <div className="logo">
        <Link to={ROUTES.HOME}>
          {/* <NeonText onClick={clicked} /> */}
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="vimeo-container">
        <div className="vimeo">
          <VimeoLogIn />
        </div>
      </div>
      {/* <SignUpLogIn /> */}
      <ul className="nav-container">
        <Link className="nav-links" to={ROUTES.SCOUTING}>
          <li>Scouting</li>
        </Link>
        {/* <Link className="nav-links" to={ROUTES.FEED}>
          <li>Feed</li>
        </Link> */}
        <Link className="nav-links" to={ROUTES.FILM_LIBRARY}>
          <li>Film Library</li>
        </Link>
        <Link className="nav-links" to={ROUTES.PROFILE}>
          <li>Profile</li>
        </Link>
        {/* <Link to="/film">
          <li className="nav-links">Film</li>
        </Link>
        <Link to="/category">
          <li className="nav-links">Categorization</li>
        </Link> */}
      </ul>
      <div className="background"></div>
    </nav>
  );
}
