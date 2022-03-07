import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form";
import CategoryLibrary from "./CategoryLibrary";
import "./category.css";

function CategoryWidget() {
  const [showForm, setShowForm] = useState(false);
  const [openCategoryWidget, setOpenCategoryWidget] = useState(false);
  // const width = "10vw";
  const [hide, setHide] = useState(true);
  const openForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const openWidget = () => {
    hide
      ? setHide(false) &&
        document
          .querySelector(".category-widget")
          .classlist.add(".small-widget")
      : setHide(true) &&
        document
          .querySelector(".small-widget")
          .classlist.add(".category-widget");
    // console.log(document.classList.contains("foo"));
    console.log(hide);
    setShowForm(false);

    // openCategoryWidget ? setWidth("15vw") : setWidth("20vw");
  };

  return (
    <div className="category-widget">
      <button className="btn" onClick={openWidget}>
        X
      </button>
      <button className="btn" onClick={openForm}>
        {showForm ? "save" : "add"}
      </button>
      {showForm ? (
        <div className="form">
          {
            //TODO: generative Form with generative entries
          }
          <Form />
          <input type="text" placeholder="new category" />
          <button className="btn">add category</button>
        </div>
      ) : (
        <div className="">
          <CategoryLibrary hide={hide} />
          <Link to="/category-library"></Link>
          {/* <li className="nav-links">Category Library</li> */}
        </div>
      )}
    </div>
  );
}

export default CategoryWidget;
