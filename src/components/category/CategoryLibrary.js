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
  const [classNameCategory, setClassNameCategory] = useState("element");
  // const [searchTermMay, setSearchTermMaj] = useState("");
  const [searchTermCategory, setSearchTermCategory] = useState("");
  const [search, setSearch] = useState();
  const [id_cate, setId_cate] = useState();
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {}, [id_cate]);

  console.log(selectedFilmCategoriesID);
  const sortedByRankingCategories = categories.sort((a, b) =>
    a.cate_ranking > b.cate_ranking ? 1 : -1
  );

  const pickCategory = (id_cate, cateName) => {
    selectCategory(id_cate, cateName);

    // setId_cate(id_cate);
    console.log(id_cate);
    // highLightedCategory();

    // document
    //   .getElementById("EBE708CE-96A8-4441-AEB4-B25FDBC3ECE3")
    //   .classList.add("element-highlighted");
  };

  // console.log(selectedFilmCategoriesID);

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

  // console.log(id_cate);

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
                .map((category, id_cate) => {
                  return (
                    <div
                      className={classNameCategory}
                      key={id_cate}
                      id={category.id_cate}
                      onClick={(e) =>
                        pickCategory(category.id_cate, category.cateName)
                      }
                      // onClick={selectCategory}
                    >
                      <Link
                        to={`/categories/${category.cateName}`}
                        onClick={() =>
                          history(`/categories/${category.cateName}`)
                        }
                      />

                      {/* // style={{ backgroundColor: "blue" }}
                      // style={hightLighted}
                      // id={category.id_cate}
                      // className="element"
                      // onClick={(e) =>
                      //   pickCategory(category.id_cate, category.cateName)
                      // } */}

                      {category.cateName}
                      {/* {category.id_cate} */}
                    </div>
                  );
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
