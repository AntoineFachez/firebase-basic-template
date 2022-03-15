import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../context/CategoryContext";
import { ScoutingContext } from "../../../context/ScoutingContext";
import CategoryMajLibrary from "./CategoryMajLibrary";
import CategoryLibrary from "./CategoryLibrary";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import "./category.css";

const CategoryTable = ({
  hide,
  // filterCateByCateMaj,
  clearCategories,
  getSelectedCategories,
  // selectCategory,
}) => {
  // console.log(hide);
  // const [filmDB, setfilmDB] = useContext(ScoutingContext);
  const [categories, setCategories] = useContext(CategoryContext);
  const { categoryAction } = useContext(CategoryContext);
  const [selectedFilmCategoriesID, setSelectedFilmCategoriesID] = useState([]);
  const [selectedFilmCategoriesNames, setSelectedFilmCategoriesNames] =
    useState([]);
  // const [selectedElementID, setSelectedElementID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedid_cate, setSelectedid_cate] = useState();
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState();
  const [id, setId] = useState();
  // const history = useNavigate();
  // console.log(categories);

  const filterCateByCateMaj = (e) => {
    const cateMaj = e.trim();
    setSearchTerm(cateMaj);
  };

  const selectCategory = (selectedElementID, cateName) => {
    console.log(selectedElementID);
    setSelectedid_cate(selectedElementID);
    if (
      JSON.stringify(selectedFilmCategoriesID).indexOf(selectedElementID) !== -1
    ) {
      setError("prevent redundancy");

      var filteredArrayID = selectedFilmCategoriesID.filter(
        (ele) => ele.trim() !== selectedElementID.trim()
      );
      var filteredArrayNames = selectedFilmCategoriesNames.filter(
        (ele) => ele.trim() !== cateName.trim()
      );
      getSelectedCategories(filteredArrayID);
      setSelectedFilmCategoriesID(filteredArrayID);
      setSelectedFilmCategoriesNames(filteredArrayNames);
      setError(null);
    } else {
      document
        .getElementById(selectedElementID)
        .classList.add("element-highlighted");
      getSelectedCategories((filmCategoriesID) => [
        ...filmCategoriesID,
        selectedElementID,
      ]);
      setSelectedFilmCategoriesID((filmCategoriesID) => [
        ...filmCategoriesID,
        selectedElementID,
      ]);
      setSelectedFilmCategoriesNames((filmCategoriesNames) => [
        ...filmCategoriesNames,
        cateName,
      ]);
      // .classList.add("element-highlighted");
    }
  };
  if (selectedFilmCategoriesID.includes(selectedid_cate)) {
    const id = selectedid_cate;
    console.log(selectedFilmCategoriesID.includes(selectedid_cate));
  } else {
    console.log(selectedFilmCategoriesID.includes(selectedid_cate));
  }
  // ;

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
                setSelectedid_cate={setSelectedid_cate}
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
