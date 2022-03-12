import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryContext";
import CategoryMajLibrary from "./CategoryMajLibrary";
import CategoryLibrary from "./CategoryLibrary";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import "./category.css";

const CategoryTable = ({
  hide,
  // filterCateByCateMaj,
  clearCategories,
  // selectCategory,
}) => {
  // console.log(hide);
  const [categories, setCategories] = useContext(CategoryContext);
  const { categoryAction } = useContext(CategoryContext);
  const [filmCategories, setFilmCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState();
  const [id, setid] = useState();
  // const history = useNavigate();
  // console.log(categories);

  const filterCateByCateMaj = (e) => {
    const cateMaj = e.trim();
    setSearchTerm(cateMaj);
  };

  const selectCategory = (id, category) => {
    console.log(id);
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
  };
  // function clearCategories() {
  //   setFilmCategories("");
  //   setSearchTerm("");
  //   setError(null);
  // }
  /**
   * Filter array items based on search criteria (query)
   */

  // console.log(searchTerm);
  // console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
  // console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']
  return (
    <div className="category-table">
      {/* <p className="dev-note">hello from categoriesProvider</p> */}
      {categoryAction}
      {hide ? (
        ""
      ) : (
        <>
          <div className="category-menu"></div>
          {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
          {error}
          <div className="">
            <input
              className="input"
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <CategoryMajLibrary
              categories={categories}
              searchTerm={searchTerm}
              id={id}
              filterCateByCateMaj={filterCateByCateMaj}
              clearCategories={clearCategories}
            />
            {searchTerm ? (
              <CategoryLibrary
                selectCategory={selectCategory}
                categories={categories}
                searchTerm={searchTerm}
                clearCategories={clearCategories}
              />
            ) : (
              ""
            )}
          </div>
          <p>{filmCategories}</p>
        </>
      )}
    </div>
  );
};

export default CategoryTable;
