import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import Form from "../form/Form";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";
import { CategoryContext } from "../../../context/CategoryContext";
import "./category.css";

function CategoryWidget({
  hide,
  openWidget,

  // filterCateByCateMaj,
  getSelectedCategories,
  clearCategories,
  selectCategory,
  selectedFilmCategoriesID,
  setSelectedFilmCategoriesID,
  selectedid_cate,
  setSelectedid_cate,
  // selectedFilmCategoriesNames,
  error,
}) {
  // const [categories, setCategories] = useContext(CategoryContext);
  const categoryAction = useContext(CategoryContext);
  // console.log(categoryAction[2]);
  const [showForm, setShowForm] = useState(false);
  // const [openCategoryWidget, setOpenCategoryWidget] = useState(false);
  const [filmCategories, setFilmCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState(null);
  // const width = "10vw";
  const [selectedFilmCategoriesNames, setSelectedFilmCategoriesNames] =
    useState([]);

  const openForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  function clearCategories() {
    setFilmCategories("");
    setSearchTerm("");
    console.log("clicked");
    // setError(null);
  }

  return (
    <div className="category-widget">
      {JSON.stringify(selectedFilmCategoriesNames)}
      {/* {categoryAction[2]} */}
      {/* <button
        className="btn"
        onClick={() => {
          openWidget
            ? openWidget().setOpenCategoryWidget(false)
            : openWidget().setOpenCategoryWidget(true);
        }}
      >
        X
      </button> */}

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
          <CategoryForm
          // filterCateByCateMaj={filterCateByCateMaj}
          />
          {/* <input type="text" placeholder="new category" /> */}
          <button className="btn">add category</button>
        </div>
      ) : (
        <div className="">
          <CategoryTable
            hide={hide}
            selectCategory={selectCategory}
            clearCategories={clearCategories}
            getSelectedCategories={getSelectedCategories}
            selectedFilmCategoriesNames={selectedFilmCategoriesNames}
            setSelectedFilmCategoriesNames={setSelectedFilmCategoriesNames}
          />
          <Link to="/category-library"></Link>
          {/* <li className="nav-links">Category Library</li> */}
        </div>
      )}
    </div>
  );
}

export default CategoryWidget;
