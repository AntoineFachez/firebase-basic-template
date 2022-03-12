import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import Form from "../form/Form";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";
import { CategoryContext } from "../../context/CategoryContext";
import "./category.css";

function CategoryWidget({ hide, openWidget }) {
  const [categories, setCategories] = useContext(CategoryContext);
  const categoryAction = useContext(CategoryContext);
  console.log(categoryAction[2]);
  const [showForm, setShowForm] = useState(false);
  const [openCategoryWidget, setOpenCategoryWidget] = useState(false);
  const [filmCategories, setFilmCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  // const width = "10vw";

  const openForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  function clearCategories() {
    setFilmCategories("");
    setSearchTerm("");
    setError(null);
  }

  const filterCateByCateMaj = (e) => {
    const cateMaj = e.trim();
    setSearchTerm(cateMaj);
  };

  function selectCategory(id, category) {
    // console.log(id);
    const elementID = id;
    const elementName = category;
    if (JSON.stringify(filmCategories).indexOf(elementID) !== -1) {
      setError("prevent redundancy");

      var filteredArray = filmCategories.filter(
        (ele) => ele.trim() !== elementID.trim()
      );
      // console.log(element);
      // console.log(filmCategories[0]);
      // console.log(filteredArray);
      // console.log(element);
      setFilmCategories(filteredArray);
      setSearchTerm("");
      setError(null);
    } else {
      setFilmCategories((filmCategories) => [
        ...filmCategories,
        elementID + " ",
      ]);
    }
  }
  // console.log(openCategoryWidget);
  return (
    <div className="category-widget">
      {/* {categoryAction[2]} */}
      <button
        className="btn"
        onClick={() => {
          openWidget().setOpenCategoryWidget(false);
        }}
      >
        X
      </button>

      {hide ? (
        ""
      ) : (
        <button className="btn" onClick={openForm}>
          {showForm ? "save" : "add"}
        </button>
      )}
      {showForm ? (
        <div className="category-form">
          {
            //TODO: generic Form with generative entries
          }
          <CategoryForm />
          {/* <input type="text" placeholder="new category" /> */}
          <button className="btn">add category</button>
        </div>
      ) : (
        <div className="">
          <button className="btn" onClick={clearCategories}>
            clear
          </button>
          <CategoryTable hide={hide} clearCategories={clearCategories} />
          <Link to="/category-library"></Link>
          {/* <li className="nav-links">Category Library</li> */}
        </div>
      )}
    </div>
  );
}

export default CategoryWidget;
