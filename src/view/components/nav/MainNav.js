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
  const [loggedIn, setLoggedIn] = useState(false);
  const clicked = () => {
    console.log("clicked");
  };
  const userMail = () => {
    if (localStorage.getItem("userLoggedInMail")) {
      setLoggedIn(true);
    }
    //  else {
    //   setLoggedin(false);
    // }
  };
  useEffect(() => {
    userMail();
  }, []);

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

      {/* {loggedIn ? ( */}
      <ul className="nav-container">
        <Link className="nav-links" to={ROUTES.SCOUTING}>
          {/* <li>Scouting</li> */}
          {/* <div className="vimeo-container"> */}
          {/* <div className="vimeo"> */}
          <VimeoLogIn />
          {/* </div> */}
          {/* </div> */}
        </Link>
        {/* <Link className="nav-links" to={ROUTES.FEED}>
          <li>Feed</li>
        </Link> */}
        <Link className="nav-links" to={ROUTES.FILM_LIBRARY}>
          {/* <li>Film Library</li> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-collection-play"
            viewBox="0 0 16 16"
          >
            <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
            <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
          </svg>
        </Link>
        <Link className="nav-links" to={ROUTES.PROFILE}>
          {/* <li>Profile</li> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </Link>
        {/* <Link to="/film">
          <li className="nav-links">Film</li>
        </Link>
        <Link to="/category">
          <li className="nav-links">Categorization</li>
        </Link> */}
      </ul>
      {/* ) : ( */}
      <div className="signUp">
        <SignUpLogIn />
      </div>
      {/* )} */}
      <div className="background"></div>
    </nav>
  );
}
