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
          <img
            className="vimeo"
            src={vimeoLoggedIn}
            alt=""
            width="35"
            height="35"
          />
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
          <img
            className="vimeo"
            src={vimeoLoggedOut}
            alt=""
            width="35"
            height="35"
            onClick={handleLogIn}
          />
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
              redirect to localhost
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
              redirect to server
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
