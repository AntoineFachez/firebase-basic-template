//https://www.youtube.com/watch?v=PKwu15ldZ7k
//https://www.youtube.com/watch?v=9bXhf_TELP4

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth, useUserAuth } from "../../../../context/AuthContext";
import { auth } from "../../../../firebase/firebase-config";
import "./auth.css";

export default function Signup() {
  // const { signUp } = useUserAuth();
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
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // let navigate = useNavigate();
  function Redirect() {
    navigate("/profile");
  }

  const signUp = async (e) => {
    e.preventDefault();
    setErrorRegister(null);
    setErrorSubmit(null);
    if (passwordConfirmRef.current.value === "") {
      return setErrorSubmit("please confirm your password");
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorRegister("passwords do not match");
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log("clicked");
      return setErrorRegister("Check your password confirmation");
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // console.log(user);
      setErrorRegister(null);
      setErrorSubmit(null);
      setRegisterEmail(null);
      Redirect();
      //   logIn(auth, registerEmail, registerPassword);
    } catch (errorRegister) {
      console.log(errorRegister.message);
      setErrorRegister(errorRegister.message);
    }
  };

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(passwordRef.current.value);
  //   if (passwordConfirmRef.current.length !== null) {
  //     return setErrorRegister("Please confirm your password");
  //   } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setErrorRegister("Check your password confirmation");
  //   } else {
  //     setErrorRegister(null);
  //     setErrorSubmit(null);
  //     try {
  //       await signUp(registerEmail, registerPassword);
  //       // setLogIn(true);
  //     } catch (err) {
  //       setErrorSubmit(err.message);
  //     }
  //   }
  // }
  const clicked = () => {
    console.log("clicked");
  };
  return (
    <div className="">
      {/* Sign Up*/}
      <h2 className="header">Sign Up</h2>

      <form
        onSubmit={signUp}
        className="form"
        // afterSubmit={() => navigate("/")}
      >
        <input
          // ref={emailRef}
          className="input-signLog"
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
          className="input-signLog"
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
          className="input-signLog"
          type="password"
          name="passwordConfirmation"
          id=""
          placeholder="Password Confirmation"
          onChange={(e) => {
            setRegisterPasswordConfirm(e.target.value);
          }}
          required
        />
        {errorSubmit && <li className="error">{errorSubmit}</li>}
        {errorRegister && <li className="error">{errorRegister}</li>}
        <button
          className="btn-submit"
          // disabled={loading}
          type="submit"
          onClick={signUp}
          // onClick={clicked}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
