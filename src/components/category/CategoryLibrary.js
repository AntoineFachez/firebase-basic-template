import React, { useState, useContext, useEffect } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Link, useNavigate } from "react-router-dom";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import "./category.css";

const CategoryLibrary = ({
  hide,
  searchTerm,
  selectCategory,
  selectedFilmCategoriesID,
  selectedFilmCategoriesNames,
  // clearCategories,
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

  const sortedByRankingCategories = categories.sort((a, b) =>
    a.cate_ranking > b.cate_ranking ? 1 : -1
  );

  const pickCategory = (id_cate, cateName) => {
    selectCategory(id_cate, cateName);
    console.log(id_cate);

    if (selectedFilmCategoriesID.includes(id_cate)) {
      console.log(true);
      document.getElementById(id_cate).classList.remove("element-highlighted");
    } else {
      document.getElementById(id_cate).classList.add("element-highlighted");
    }
    // .classList.add("element-highlighted");
    // element.style.backgroundColor = "yellow";
    // document.getElementById(id_cate).style.color = "red";
  };

  console.log(selectedFilmCategoriesID);
  const filterCateByCate = (e) => {
    const sortedByRankingCategories = e.trim();
    searchTermCategory(sortedByRankingCategories);
  };

  function clearCategories() {
    setFilmCategories("");
    searchTermCategory("");
    setError(null);
  }
  /**
   * Filter array items based on search criteria (query)
   */

  // console.log(searchTerm);
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
              {sortedByRankingCategories
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
                  if (selectedFilmCategoriesID.includes(id)) {
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
                          style={{ backgroundColor: "blue" }}
                          // style={hightLighted}
                          id={category.id}
                          className="element"
                          onClick={(e) =>
                            pickCategory(category.id_cate, category.cateName)
                          }
                        >
                          {category.cateName}
                        </li>
                      </div>
                    );
                  } else {
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
                          id={category.id}
                          className="element"
                          onClick={(e) =>
                            pickCategory(category.id_cate, category.cateName)
                          }
                        >
                          {category.cateName}
                        </li>
                      </div>
                    );
                  }
                })}
            </ul>
            {JSON.stringify(selectedFilmCategoriesNames)}
            {/* {JSON.stringify(selectedFilmCategoriesID)} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryLibrary;
