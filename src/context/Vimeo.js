import React from "react";
/*https://api.vimeo.com/oauth/authorize?response_type=token&client_id={client_id}&redirect_uri={redirect_uri}&state={state}&scope={scope_list} */
import vimeoLogoLoggedIn from "../images/vimeologgedIn.png";
import vimeoLogoLoggedOut from "../images/vimeologgedOut.png";
// import axios from "axios";

//TODO: refactor to a Context API
const CLIENT_ID = process.env.REACT_APP_VIMEO_CLIENT_ID;
const AUTH_URL = process.env.REACT_APP_VIMEO_AUTH_URL;
const REDIRECT_URL = "http://localhost:3002/scouting/";
const STATE = [0];
const SCOPES = ["me"];
// const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";
const vimeoLoggedIn = vimeoLogoLoggedIn;
const vimeoLoggedOut = vimeoLogoLoggedOut;

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

const Vimeo = () => {
  // const [token, setToken] = useState("");
  // const [data, setData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  const handleLogIn = () => {
    window.location = `${AUTH_URL}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPES}`;
  };

  // const loadVimeo = () => {
  //   if (localStorage.getItem("accessToken")) {
  //     setToken(localStorage.getItem("accessToken"));
  //   } else {
  //     setData("");
  //   }
  // };
  // const handleGetFeed = async () => {
  //   // displayLoading();
  //   setLoading(true);
  //   setLoaded(false);
  //   // displayLoading();
  //   console.log(loading);
  //   axios
  //     .get(await FEED_ENDPOINT, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       setData(res.data);
  //       setLoading(false);
  //       setLoaded(true);
  //       console.log(loading);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   loadVimeo();
  //   handleGetFeed();
  // }, []);
  return (
    <div>
      {access_token ? (
        <div style={{ color: "green" }}>
          {/* {loading ? (
            <circle id="loading" onClick={handleGetFeed}></circle>
          ) : (
            ""
          )} */}
          <img src={vimeoLoggedIn} alt="" width="35" height="35" />
          {/* <img scr= alt="vimeo-logo" /> */}
        </div>
      ) : (
        <img
          src={vimeoLoggedOut}
          alt=""
          width="35"
          height="35"
          onClick={handleLogIn}
        />
      )}

      {/* {loggedVimeo ? <div>logged in</div> : <div>logged out</div>} */}
      {/* <li>looking for videos ? Start watching</li> */}
      {/* <button onClick={loadFeed}>load Feed</button> */}
    </div>
  );
};

export default Vimeo;
