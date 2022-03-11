//https://www.youtube.com/watch?v=PKwu15ldZ7k
//https://www.youtube.com/watch?v=9bXhf_TELP4

import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from "../../../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./auth.css";

export default function LogIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  // console.log(loggedIn);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorLogIn, setErrorLogin] = useState("");
  // console.log(auth);

  const navigate = useNavigate();
  // console.log(user);

  function Redirect() {
    navigate("/profile");
  }

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      setLoggedIn(true);
      // console.log(loggedIn);
      setErrorLogin("");
      setUser(loginEmail);
      Redirect();
      // navigate.push("/profil");
      // return <Navigate to="/profil" />;
    } catch (errorLogIn) {
      setErrorLogin(errorLogIn.message);
    }
  };
  const logOut = async () => {
    await signOut(auth);
    setLoggedIn(false);
    setErrorLogin(null);
  };

  return (
    <div className="">
      {/* Log In*/}
      <h2 className="header">{loggedIn ? "Welcome" : "Bye"}</h2>
      {loggedIn ? (
        <h4 className="user-creds">{user}</h4>
      ) : (
        <form
          // onSubmit={handleSubmit}
          className="form"
          // afterSubmit={() => navigate("/")}
        >
          {/* <li>Logged Out</li> */}

          {errorLogIn && <li>{errorLogIn}</li>}
          <input
            // ref={emailRef}
            className="input-signLog"
            type="email"
            name="email"
            id=""
            placeholder="email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            required
          />
          <input
            // ref={passwordRef}
            className="input-signLog"
            type="password"
            name="password"
            id=""
            placeholder="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            required
          />
          <button className="btn-submit" onClick={loggedIn ? logOut : logIn}>
            {" "}
            {loggedIn ? "Log Out" : "Log In"}
          </button>
        </form>
      )}
    </div>
  );
}
