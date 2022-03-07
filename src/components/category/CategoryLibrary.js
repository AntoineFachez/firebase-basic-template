import React, { useState, useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Link, useNavigate } from "react-router-dom";

const CategoryLibrary = ({ hide }) => {
  // console.log(hide);
  const [categories, setCategories] = useContext(CategoryContext);
  const [filmCategories, setFilmCategories] = useState([]);
  const [search, setSearch] = useState();
  const [id, setid] = useState();
  const [error, setError] = useState(null);
  const history = useNavigate();

  function handleClick(e) {
    const element = e.trim();
    if (JSON.stringify(filmCategories).indexOf(element) !== -1) {
      setError("prevent redundancy");

      var filteredArray = filmCategories.filter(
        (ele) => ele.trim() !== element.trim()
      );
      // console.log(element);
      // console.log(filmCategories[0]);
      // console.log(filteredArray);
      // console.log(element);
      setFilmCategories(filteredArray);
      setError(null);
    } else {
      setFilmCategories((filmCategories) => [...filmCategories, element + " "]);
    }
  }
  function clearCategories() {
    setFilmCategories("");
    setError(null);
  }
  const fruits = ["apple", "banana", "grapes", "mango", "orange"];

  /**
   * Filter array items based on search criteria (query)
   */
  const filterItems = (arr, query) => {
    return arr.filter(
      (el) => el.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  // console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
  // console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']
  return (
    <div>
      {/* <p className="dev-note">hello from categoriesProvider</p> */}

      {hide ? (
        ""
      ) : (
        <div>
          <button className="btn" onClick={clearCategories}>
            clear
          </button>
          <input className="input" type="text" placeholder="search" />
          <p>{filmCategories}</p>
          {/* <div className="tools">
          <Accordion />
        </div>{" "} */}
          {error}
          <ul className="grid-container">
            {categories.map((category, index) => {
              return (
                <div
                  className=""
                  key={index}
                  // onClick={handleClick}
                >
                  <Link
                    to={`/categories/${id}`}
                    onClick={() => history(`/categories/${id}`)}
                  />
                  <li
                  // value={(uniq = category.cateMaj) => [
                  //   ...new Set(category.cateMaj),
                  // ]}
                  >
                    {category.cateMaj}
                    {/* {(uniq = category.cateMaj) => [...new Set(category.cateMaj)]} */}
                  </li>
                  <li
                    className="grid-element"
                    onClick={(e) => handleClick(category.id)}
                  >
                    {category.category}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryLibrary;
