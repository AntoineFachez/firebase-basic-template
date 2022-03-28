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
  selectedFilmCategoriesNames,
  setSelectedFilmCategoriesNames,
  // selectCategory,
}) => {
  // console.log(hide);
  // const [filmDB, setfilmDB] = useContext(ScoutingContext);
  const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
  // console.log(categoriesDB);
  const { categoryAction } = useContext(CategoryContext);
  const [selectedFilmCategoriesID, setSelectedFilmCategoriesID] = useState([]);

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
  const clearInput = () => {
    document.getElementById("searchCateInput").value = "";
    setSearchTerm("");
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
      document
        .getElementById(selectedElementID)
        .classList.remove("element-highlighted");
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
      localStorage.setItem(
        "selectedFilmCategoriesID",
        JSON.stringify(selectedFilmCategoriesID)
      );
    }
  };
  if (selectedFilmCategoriesID.includes(selectedid_cate)) {
    const id = selectedid_cate;
    console.log(selectedFilmCategoriesID.includes(selectedid_cate));
  } else {
    console.log(selectedFilmCategoriesID.includes(selectedid_cate));
  }
  // ;
  const removeCatefromSelectedCateList = (e, selectedFilmCategoriesID) => {
    // e.preventDefault();

    for (var i = 0; i < selectedFilmCategoriesID.length; i++) {
      if (selectedFilmCategoriesID[i] === e) {
        selectedFilmCategoriesID.splice(i, 1);
      }
    }

    console.log("clicked");
  };
  return (
    <div className="category-table">
      {/* {categoryAction} */}

      {/* <p className="dev-note">hello from categoriesProvider</p> */}
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
            <li
              onClick={clearInput}
              // onClick={(e) =>
              //   removeCatefromSelectedCateList(
              //     selectedFilmCategoriesID,
              //     e.target.value
              //   )
              // }
            >
              {searchTerm}
            </li>
            <input
              id="searchCateInput"
              className="input"
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            {searchTerm ? (
              ""
            ) : (
              <CategoryMajLibrary
                categories={categoriesDB}
                searchTerm={searchTerm}
                id={id}
                filterCateByCateMaj={filterCateByCateMaj}
                clearCategories={clearCategories}
              />
            )}
            {searchTerm ? (
              <CategoryLibrary
                categories={categoriesDB}
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
