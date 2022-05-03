import React from "react";
import DynamicLandscape from "../../view/sketches/DynamicLandscape";
import SignUpLogIn from "../user/SignUpLogInOut/SignUpLogIn";

function Profile() {
  // const userMail = localStorage.getItem("userLoggedInMail");
  return (
    <div>
      {/* Group Component */}
      {/* {userMail ? <h4>Welcome {userMail}</h4> : ""}
      <div className="signUp">
        <SignUpLogIn />
      </div> */}
      <div className="widget"></div>
      <div className="sketch">{/* <DynamicLandscape /> */}</div>
    </div>
  );
}

export default Profile;
