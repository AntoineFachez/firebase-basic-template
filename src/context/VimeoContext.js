import React, { createContext, useContext, useEffect, useState } from "react";
/*https://api.vimeo.com/oauth/authorize?response_type=token&client_id={client_id}&redirect_uri={redirect_uri}&state={state}&scope={scope_list} */
// import vimeoLogoLoggedIn from "../images/vimeologgedIn.png";
// import vimeoLogoLoggedOut from "../images/vimeologgedOut.png";
// import axios from "axios";
// import { auth } from "../context/AuthContext";

export const VimeoContext = createContext();

//TODO: refactor to a Context API
const CLIENT_ID = process.env.REACT_APP_VIMEO_CLIENT_ID;
const AUTH_URL = process.env.REACT_APP_VIMEO_AUTH_URL;
const LOCALHOST_REDIRECT_URL = "http://localhost:3000/scouting/";
// const SERVER_REDIRECT_URL = "https://fir-basic-template.web.app/scouting/";
const SERVER_REDIRECT_URL = "https://scout-your-pool.web.app/scouting/";
const STATE = [0];
const SCOPES = ["me"];
// const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";
// const vimeoLoggedIn = vimeoLogoLoggedIn;
// const vimeoLoggedOut = vimeoLogoLoggedOut;
// console.log(vimeoLogoLoggedOut);

// const paramSplit = window.location.hash
//   .substring(1)
//   .split("&")
//   .reduce((accumulater, currentValue) => {
//     const [key, value] = currentValue.split("=");
//     accumulater[key] = value;
//     return accumulater;
//   }, {});
// const { access_token, token_type, scope, expires_in } = paramSplit;
// localStorage.clear();
// localStorage.setItem("accessToken", access_token);
// localStorage.setItem("tokenType", token_type);
// localStorage.setItem("scope", scope);
// localStorage.setItem("expiresIn", expires_in);

export const VimeoProvider = ({ children }) => {
  // const { user } = useContext(auth);
  const [filmCategories, setFilmCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [redirectURL, setRedirectURL] = useState(SERVER_REDIRECT_URL);

  return (
    <VimeoContext.Provider
      value={[
        LOCALHOST_REDIRECT_URL,
        SERVER_REDIRECT_URL,
        // vimeoLoggedIn,
        // vimeoLoggedOut,
        // access_token,
        filmCategories,
        searchTerm,
        redirectURL,
        // chooseHost,
        // handleLogIn(),
      ]}
    >
      {children}
    </VimeoContext.Provider>
  );
};

// export default Vimeo;
