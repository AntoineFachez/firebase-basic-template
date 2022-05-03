import React from "react";

function Form({ listInputs }) {
  return (
    <div className="form">
      <h1>Form</h1>
      {listInputs.map((input) => {
        return <div>{input}</div>;
      })}
    </div>
  );
}

export default Form;
