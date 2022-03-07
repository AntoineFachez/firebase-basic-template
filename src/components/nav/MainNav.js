import logo from "../../images/p00l glow Square small.png";
import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Vimeo from "../../context/Vimeo";
import "./main-nav.css";
import SignUpLogIn from "../user/SignUpLogInOut/SignUpLogIn";

export default function MainNav() {
  return (
    <nav className="main-nav">
      <div className="logo">
        <Link to={ROUTES.HOME}>
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="vimeo">
        <Vimeo />
      </div>
      {/* <SignUpLogIn /> */}
      <ul className="nav-container">
        <Link className="nav-links" to={ROUTES.SCOUTING}>
          <li>Scouting</li>
        </Link>
        {/* <Link className="nav-links" to={ROUTES.FEED}>
          <li>Feed</li>
        </Link> */}
        {/* <Link className="nav-links" to={ROUTES.FILM_LIBRARY}>
          <li>Film Library</li>
        </Link> */}
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
