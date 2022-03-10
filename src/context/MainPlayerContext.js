import React, { useState, useEffect, createContext } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import axios from "axios";

const FEED_ENDPOINT = "https://api.vimeo.com/me/feed";

export const MainPlayerContext = createContext();

export const MainPlayerProvider = (props) => {
  const [mainPlayerClipLink, setMainPlayerClipLink] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // useEffect(() => {}, []);
  // const handleGetFeed = async () => {
  //   // displayLoading();
  //   axios
  //     .get(await FEED_ENDPOINT, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       // hideLoading();
  //       setData(res.data);
  //       setLoad(true);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <MainPlayerContext.Provider
      value={[mainPlayerClipLink, setMainPlayerClipLink]}
    >
      {props.children}
    </MainPlayerContext.Provider>
  );
};
