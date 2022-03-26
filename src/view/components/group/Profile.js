import React from "react";
import DynamicLandscape from "../../sketches/DynamicLandscape";

function Profile() {
  const userMail = localStorage.getItem("userLoggedInMail");
  return (
    <div>
      {/* Group Component */}
      <div className="widget">
        <h4>Welcome {userMail}</h4>
      </div>
      <div className="sketch">
        <DynamicLandscape />
      </div>
    </div>
  );
}

export default Profile;
