import React, { useContext, useEffect, useRef, useState } from "react";
import "./auth.css";
import Signup from "./SignUp";
import LogIn from "./LogIn";
import { UserAuthContext } from "../../../context/AuthContext";

import { ClickAwayListener } from "@mui/base";

const SignUpLogIn = () => {
  const [openSignInLogInOut, setOpenSignInLogInOut] = useState(false);
  const logInRef = useRef();
  const [loggedIn, setLoggedIn] = useState("");
  const [uiSignUp, setUiSignUp] = useState(true);

  const bodyStyle = {
    filter: "blur(4px)",
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  function openWidget() {
    openSignInLogInOut
      ? setOpenSignInLogInOut(false)
      : setOpenSignInLogInOut(true);
    // console.log(openSignInLogInOut);
  }
  function closeWidget() {
    setOpenSignInLogInOut(true);
  }

  const uiContextSignUp = (e) => {
    e.preventDefault();
    uiSignUp ? setUiSignUp(false) : setUiSignUp(true);

    // console.log(uiSignUp);
  };
  return (
    <div className="container">
      <button className="btn" onClick={openWidget}>
        <li>login</li>
      </button>
      ;{/* <div className="form"></div> */}
      <div className="signUp-logIn">
        {openSignInLogInOut ? (
          ""
        ) : (
          <div>
            <ClickAwayListener onClickAway={closeWidget}>
              <div ref={logInRef} className="signUp-logIn">
                <SignUpLogIn />
              </div>
            </ClickAwayListener>
          </div>
        )}
      </div>
      ;
      {loggedIn ? (
        ""
      ) : (
        <button className="btn-switch" onClick={uiContextSignUp}>
          {uiSignUp ? "Log in" : "Sign up"}
        </button>
      )}
      {uiSignUp && !loggedIn ? <Signup /> : <LogIn />}
    </div>
  );
};

export default SignUpLogIn;
