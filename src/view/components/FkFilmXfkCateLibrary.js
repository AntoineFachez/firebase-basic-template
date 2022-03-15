import React, { useState, useContext, useEffect } from "react";
// import fk_filmXfk_cateDetails from "./UniversitiyDetails";
import { FkFilmXfkCateContext } from "../../context/FkFilmXfkCateContext";
import { CategoryContext } from "../../context/CategoryContext";
import Tile from "./tile/Tile";
import { Link, useNavigate } from "react-router-dom";

const Fk_filmXfk_cateLibrary = () => {
  const [categories, setCategories] = useContext(CategoryContext);
  const [fkFilmXfkCate, setFkFilmXfkCate] = useContext(FkFilmXfkCateContext);
  const [mergedArray, setMergedArray] = useState([]);
  console.log(fkFilmXfkCate);
  const [id, setid] = useState();
  const history = useNavigate();

  useEffect(() => {
    getCategoryName();
  }, []);

  const getCategoryName = () => {
    let arr5 = categories;
    let arr6 = fkFilmXfkCate;

    arr6.forEach((memberObj) =>
      memberObj.fk_cate.forEach((fk_cate) => {
        arr5.forEach((arr5Obj) => {
          if (arr5Obj.id === fk_cate) {
            // console.log(
            //   `The film ${memberObj.fk_film} is in the categoryId ${category.cateName}`
            // );
          }
        });
      })
    );

    let mergedArrays = [];
    let mergeArrays = () => {
      let arr1 = arr5;
      let arr2 = arr6;

      arr2.forEach((memberObj) =>
        memberObj.fk_cate.forEach((matchingId) => {
          arr1.forEach((arr1Obj) => {
            if (arr1Obj.id === matchingId) {
              mergedArrays.push({
                fk_cate: arr1Obj.id,
                categoryName: arr1Obj.cateName,
                matchingId: matchingId,
                fk_film: memberObj.fk_film,
                // filmName: memberObj.name,
              });
            }
          });
          // console.log(mergedArrays[0].categoryName);
        })
      );
    };
    setMergedArray(mergedArrays);
    mergeArrays();
  };
  return (
    <div>
      {/* <p className="dev-note">hello from fk_filmXfk_cateProvider</p> */}

      <div className="widget">
        <h4>fk_filmXfk_cate Library </h4>
        <ul className="list-container">
          {mergedArray.map((mergedArray) => {
            return (
              <div className="" key={mergedArray.id}>
                {mergedArray.categoryName}
                <br />
                {mergedArray.fk_film}
              </div>
            );
          })}
        </ul>{" "}
        <Link to="/fk-filmXfk-cate-library">
          <li className="nav-links">fk_filmXfk_cate Library</li>
        </Link>
      </div>
    </div>
  );
};

export default Fk_filmXfk_cateLibrary;
