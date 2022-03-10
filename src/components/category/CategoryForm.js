import React from "react";
import Form from "../form/Form";

function CategoryForm() {
  //   const listInputs = [document.createElement("input")];
  const listInputs = [<input type="text" placeholder="new category" />];
  return (
    <div>
      <h1>CategoryForm</h1>
      <Form listInputs={listInputs} />
    </div>
  );
}

export default CategoryForm;
