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

  const shorterArray = [];
  categories.forEach((element) => {
    if (!shorterArray.includes(element.cateMaj)) {
      shorterArray.push(element.cateMaj);
    }
  });

  console.log(shorterArray);
  console.log(categories);
  return (
    <div>
      <ul className="category-list">
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
              <li className="category-major"></li>
              <li
                className="category"
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
