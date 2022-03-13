import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./category.css";

function CategoryMajLibrary({
  categories,
  searchTerm,
  id,
  filterCateByCateMaj,
}) {
  const history = useNavigate();
  // console.log(categories);
  const shorterArray = [];

  const sortedByRankingMajCategories = categories.sort((a, b) =>
    a.cateMaj_ranking > b.cateMaj_ranking ? 1 : -1
  );
  const filteredCategories = categories.forEach((category) => {
    if (!shorterArray.includes(category.cateMaj)) {
      shorterArray.push(category.cateMaj);
    }
  });

  // console.log(shorterArray);
  // console.log(categories);
  return (
    <div>
      <ul className="categoryMaj-list">
        {shorterArray.map((cateMaj, index) => {
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
                className="element-maj"
                onClick={(e) => filterCateByCateMaj(cateMaj)}
              >
                {cateMaj}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryMajLibrary;
