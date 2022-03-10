import React from "react";
import "./button.css";

function Button({ className, style, buttonAction, buttonText }) {
  return (
    <div>
      <button className={className} style={style} onClick={buttonAction}>
        {buttonText}
      </button>
    </div>
  );
}

export default Button;
