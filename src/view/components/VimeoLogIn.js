import React, { useContext, useEffect, useState } from "react";
import { VimeoContext } from "../../context/VimeoContext";
import vimeoLogoLoggedIn from "../../images/vimeologgedIn.png";
import vimeoLogoLoggedOut from "../../images/vimeologgedOut.png";

export const VimeoLogIn = () => {
  //TODO: refactor to a Context API
  //   const {
  //     access_token,
  //     vimeoLoggedOut,
  //     vimeoLoggedIn,
  //     LOCALHOST_REDIRECT_URL,
  //     SERVER_REDIRECT_URL,
  //     AUTH_URL,
  //     CLIENT_ID,
  //     STATE,
  //     SCOPES,
  //   } = useContext(VimeoContext);
  //   const handleLogIn = useContext(VimeoContext);
  //   const chooseHost = useContext(VimeoContext);
  const CLIENT_ID = process.env.REACT_APP_VIMEO_CLIENT_ID;
  const AUTH_URL = process.env.REACT_APP_VIMEO_AUTH_URL;
  const LOCALHOST_REDIRECT_URL = "http://localhost:3000/scouting/";
  const SERVER_REDIRECT_URL = "https://fir-basic-template.web.app/scouting/";
  //   const SERVER_REDIRECT_URL = "http://localhost:3000/scouting/";
  const STATE = [0];
  const SCOPES = ["me"];
  const vimeoLoggedIn = vimeoLogoLoggedIn;
  const vimeoLoggedOut = vimeoLogoLoggedOut;

  const [redirectURL, setRedirectURL] = useState(SERVER_REDIRECT_URL);
  const handleLogIn = () => {
    window.location = `${AUTH_URL}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${redirectURL}&state=${STATE}&scope=${SCOPES}`;
  };

  const paramSplit = window.location.hash
    .substring(1)
    .split("&")
    .reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  const { access_token, token_type, scope, expires_in } = paramSplit;
  localStorage.clear();
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("tokenType", token_type);
  localStorage.setItem("scope", scope);
  localStorage.setItem("expiresIn", expires_in);
  const chooseHost = (e) => {
    console.log(e);
    setRedirectURL(e);
  };
  return (
    <div className="vimeo">
      {/* {redirectURL} */}
      {access_token ? (
        <div style={{ color: "green" }}>
          {/* {loading ? (
            <circle id="loading" onClick={handleGetFeed}></circle>
          ) : (
            ""
          )} */}
          {/* <img
            className="vimeo"
            src={vimeoLoggedIn}
            alt=""
            width="35"
            height="35"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#1ab7ea"
            class="bi bi-vimeo"
            viewBox="0 0 16 16"
            // onClick={handleLogIn}
          >
            <path d="M15.992 4.204c-.071 1.556-1.158 3.687-3.262 6.393-2.175 2.829-4.016 4.243-5.522 4.243-.933 0-1.722-.861-2.367-2.583L3.55 7.523C3.07 5.8 2.556 4.94 2.007 4.94c-.118 0-.537.253-1.254.754L0 4.724a209.56 209.56 0 0 0 2.334-2.081c1.054-.91 1.845-1.388 2.373-1.437 1.243-.123 2.01.728 2.298 2.553.31 1.968.526 3.19.646 3.666.36 1.631.756 2.446 1.186 2.445.334 0 .836-.53 1.508-1.587.671-1.058 1.03-1.863 1.077-2.415.096-.913-.263-1.37-1.077-1.37a3.022 3.022 0 0 0-1.185.261c.789-2.573 2.291-3.825 4.508-3.756 1.644.05 2.419 1.117 2.324 3.2z" />
          </svg>{" "}
          {/* <img scr= alt="vimeo-logo" /> */}
        </div>
      ) : (
        <div
          className="url-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          {/* <img
            className="vimeo"
            src={vimeoLoggedOut}
            alt=""
            width="35"
            height="35"
            onClick={handleLogIn}
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-vimeo"
            viewBox="0 0 16 16"
            onClick={handleLogIn}
          >
            <path d="M15.992 4.204c-.071 1.556-1.158 3.687-3.262 6.393-2.175 2.829-4.016 4.243-5.522 4.243-.933 0-1.722-.861-2.367-2.583L3.55 7.523C3.07 5.8 2.556 4.94 2.007 4.94c-.118 0-.537.253-1.254.754L0 4.724a209.56 209.56 0 0 0 2.334-2.081c1.054-.91 1.845-1.388 2.373-1.437 1.243-.123 2.01.728 2.298 2.553.31 1.968.526 3.19.646 3.666.36 1.631.756 2.446 1.186 2.445.334 0 .836-.53 1.508-1.587.671-1.058 1.03-1.863 1.077-2.415.096-.913-.263-1.37-1.077-1.37a3.022 3.022 0 0 0-1.185.261c.789-2.573 2.291-3.825 4.508-3.756 1.644.05 2.419 1.117 2.324 3.2z" />
          </svg>{" "}
          {/* {redirectURL === SERVER_REDIRECT_URL ? (
            <button
              className="localhost"
              onClick={(e) => chooseHost(e.target.value)}
              value={LOCALHOST_REDIRECT_URL}
            >
              localhost
            </button>
          ) : (
            ""
          )} */}
          {redirectURL === LOCALHOST_REDIRECT_URL ? (
            <button
              className="server"
              style={{
                display: "flex",
                backgroundColor: "#333",
                borderStyle: "none",
                color: "white",
                padding: "0.2rem",
              }}
              onClick={(e) => chooseHost(e.target.value)}
              value={SERVER_REDIRECT_URL}
            >
              localhost
            </button>
          ) : (
            <button
              style={{
                display: "flex",
                backgroundColor: "#333",
                borderStyle: "none",
                color: "white",
                padding: "0.2rem",
              }}
              className="localhost"
              onClick={(e) => chooseHost(e.target.value)}
              value={LOCALHOST_REDIRECT_URL}
            >
              backend
            </button>
          )}
          {/* {redirectURL} */}
        </div>
      )}

      {/* {loggedVimeo ? <div>logged in</div> : <div>logged out</div>} */}
      {/* <li>looking for videos ? Start watching</li> */}
      {/* <button onClick={loadFeed}>load Feed</button> */}
    </div>
  );
};
