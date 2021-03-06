import React, { useContext, useEffect, useRef, useState } from "react";
import Signup from "./SignUp";
import LogIn from "./LogIn";
import { UserAuthContext } from "../../../context/AuthContext";
import { ClickAwayListener } from "@mui/base";
import "./auth.css";

const SignUpLogIn = () => {
  const [openSignInLogInOut, setOpenSignInLogInOut] = useState(true);
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
      <button className="btn-open-signUp-logIn" onClick={openWidget}>
        <li>signUp / login</li>
      </button>
      {/* <div className="form"></div> */}
      <div className="">
        {openSignInLogInOut ? (
          <div></div>
        ) : (
          <ClickAwayListener onClickAway={closeWidget}>
            {/* <SignUpLogIn /> */}
            <div ref={logInRef} className="signUp-logIn">
              <div className="signUp-logIn-menu">
                <button className="btn-switch" onClick={uiContextSignUp}>
                  {uiSignUp ? "Log in" : "Sign up"}
                </button>
              </div>
              {uiSignUp && !loggedIn ? <Signup /> : <LogIn />}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default SignUpLogIn;
