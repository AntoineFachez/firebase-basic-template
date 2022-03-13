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
  const [selectedFilmCategoriesID, setSelectedFilmCategoriesID] = useState([]);
  const [selectedFilmCategoriesNames, setSelectedFilmCategoriesNames] =
    useState([]);
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

  const selectCategory = (id, cateName) => {
    const elementID = id;
    const elementName = cateName;
    if (JSON.stringify(selectedFilmCategoriesID).indexOf(elementID) !== -1) {
      setError("prevent redundancy");

      var filteredArrayID = selectedFilmCategoriesID.filter(
        (ele) => ele.trim() !== elementID.trim()
      );
      var filteredArrayNames = selectedFilmCategoriesNames.filter(
        (ele) => ele.trim() !== cateName.trim()
      );

      setSelectedFilmCategoriesID(filteredArrayID);
      setSelectedFilmCategoriesNames(filteredArrayNames);
      setError(null);
    } else {
      setSelectedFilmCategoriesID((filmCategoriesID) => [
        ...filmCategoriesID,
        elementID,
      ]);
      setSelectedFilmCategoriesNames((filmCategoriesNames) => [
        ...filmCategoriesNames,
        cateName,
      ]);
    }
  };
  // console.log(selectedFilmCategoriesID);
  // console.log(selectedFilmCategoriesNames);
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
                categories={categories}
                selectCategory={selectCategory}
                searchTerm={searchTerm}
                selectedFilmCategoriesID={selectedFilmCategoriesID}
                selectedFilmCategoriesNames={selectedFilmCategoriesNames}
                clearCategories={clearCategories}
              />
            ) : (
              ""
            )}
          </div>
          {/* <p>{selectedFilmCategories}</p> */}
        </>
      )}
    </div>
  );
};

export default CategoryTable;
