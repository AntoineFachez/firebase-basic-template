//https://www.youtube.com/watch?v=PKwu15ldZ7k
//https://www.youtube.com/watch?v=9bXhf_TELP4

import React, { useEffect, useRef, useState } from "react";
import { useAuth, useUserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";
import "./auth.css";

export default function Signup() {
  const { signUp } = useUserAuth();
  const [dev, setDev] = useState(false);
  const history = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);
  // console.log(loggedIn);
  const [uiSignUp, setUiSignUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errorSubmit, setErrorSubmit] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // const signUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword
  //     );
  //     console.log(user);
  //     setErrorRegister(null);
  //     setRegisterEmail(null);
  //     //   logIn(auth, registerEmail, registerPassword);
  //   } catch (errorRegister) {
  //     console.log(errorRegister.message);
  //     setErrorRegister(errorRegister.message);
  //   }
  // };
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorSubmit("Passwords do not match");
    } else {
      setErrorSubmit("");
      try {
        await signUp(registerEmail, registerPassword);
        // setLogIn(true);
      } catch (err) {
        setErrorSubmit(err.message);
      }
    }
  }

  return (
    <div className="container">
      {/* Sign Up*/}
      <h2 className="header">Sign Up</h2>
      {errorSubmit && <li>{errorSubmit}</li>}
      {errorRegister && <li>{errorRegister}</li>}
      <form
        onSubmit={handleSubmit}
        className="form"
        // afterSubmit={() => navigate("/")}
      >
        <input
          // ref={emailRef}
          className="input"
          type="email"
          name="email"
          id=""
          placeholder="email"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
          required
        />
        <input
          ref={passwordRef}
          className="input"
          type="password"
          name="password"
          // value=""
          id=""
          placeholder="Password"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
          required
        />
        <input
          ref={passwordConfirmRef}
          className="input"
          type="password"
          name="passwordConfirmation"
          id=""
          placeholder="Password Confirmation"
          onChange={(e) => {
            setRegisterPasswordConfirm(e.target.value);
          }}
          required
        />
      </form>
      <button
        className="btn-submit"
        disabled={loading}
        type="submit"
        // onClick={signUp}
      >
        Sign Up
      </button>
    </div>
  );
}
