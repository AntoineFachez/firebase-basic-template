import React, { useState, useContext, useEffect } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Link, useNavigate } from "react-router-dom";

import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import "./category.css";

const CategoryLibrary = ({
  hide,
  searchTerm,
  selectCategory,
  clearCategories,
}) => {
  // console.log(hide);
  const searchTermMaj = searchTerm;
  const [categories, setCategories] = useContext(CategoryContext);
  const [filmCategories, setFilmCategories] = useState([]);
  // const [searchTermMay, setSearchTermMaj] = useState("");
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [search, setSearch] = useState();
  const [id, setid] = useState();
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    // setCategories();
  }, []);

  const filterCateByCate = (e) => {
    const category = e.trim();
    searchTermCategory(category);
  };

  function clearCategories() {
    setFilmCategories("");
    searchTermCategory("");
    setError(null);
  }
  /**
   * Filter array items based on search criteria (query)
   */

  console.log(searchTerm);
  // console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
  // console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']
  return (
    <div className="">
      {/* <p className="dev-note">hello from categoriesProvider</p> */}

      {hide ? (
        ""
      ) : (
        <div>
          <div className="category-menu"></div>

          {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
          {error}
          <div className="">
            <ul className="category-list">
              {categories
                .filter((value) => {
                  if (searchTerm === "") {
                    return value;
                  } else if (
                    value.cateName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  } else if (
                    value.cateMaj
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((category, index) => {
                  return (
                    <div
                      className=""
                      key={index}
                      // onClick={selectCategory}
                    >
                      <Link
                        to={`/categories/${id}`}
                        onClick={() => history(`/categories/${id}`)}
                      />
                      <li
                        className="element"
                        onClick={(e) =>
                          selectCategory(category.id, category.cateName)
                        }
                      >
                        {category.cateName}
                      </li>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryLibrary;
