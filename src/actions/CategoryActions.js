// import { useContext } from "react";
// import { CategoryStateContext } from "../state/CategorySearchState";

// export const categoryAction = "hello World from Action 1";
// export const categoryAction2 = "hello World from Action 2";
// const CategoryActionProvider = () => {
//   const {
//     setSelectedid_cate,
//     selectedFilmCategoriesID,
//     setError,
//     selectedFilmCategoriesNames,
//     getSelectedCategories,
//     setSelectedFilmCategoriesID,
//     setSelectedFilmCategoriesNames,
//     filteredFilmDB,
//   } = useContext(CategoryStateContext);
// };
// const filteredFilmsByCatgory = (filmDB, filteredFilmDB, selectedCategories) => {
//     CategoryActionProvider();
//   // console.log("--- 2 --selected Categories: ", selectedCategories);
//   // if (!filteredFilmDB) {
//   if (selectedCategories) {
//     filmDB.forEach((film) => {
//       const filmCategories = film.film.categories;
//       const filmData = film;
//       // console.log("--- 3 --FilmDB Element filmData ", filmData);
//       filmCategories.forEach((filmCategoryID) => {
//         if (filteredFilmDB.indexOf(film) === -1) {
//           // console.log("--- each filmCategory", filmCategoryID);
//           selectedCategories.forEach((categoryID) => {
//             // console.log(filmCategoryID.cate.id_cate, categoryID);
//             if (filmCategoryID.cate.id_cate === categoryID) {
//               const found = filmData;
//               filteredFilmDB.push(found);
//               removeDuplicates(filteredFilmDB);
//             }
//           });
//         }
//       });
//     });
//   }
// };
// const removeDuplicates = (arr) => {
//   arr.filter((item, index) => arr.indexOf(item) === index);
// };

// const selectCategory = (selectedElementID, cateName) => {
//   console.log(selectedElementID);
//   setSelectedid_cate(selectedElementID);
//   if (
//     JSON.stringify(selectedFilmCategoriesID).indexOf(selectedElementID) !== -1
//   ) {
//     setError("prevent redundancy");

//     var filteredArrayID = selectedFilmCategoriesID.filter(
//       (ele) => ele.trim() !== selectedElementID.trim()
//     );
//     var filteredArrayNames = selectedFilmCategoriesNames.filter(
//       (ele) => ele.trim() !== cateName.trim()
//     );
//     document
//       .getElementById(selectedElementID)
//       .classList.remove("element-highlighted");
//     getSelectedCategories(filteredArrayID);
//     setSelectedFilmCategoriesID(filteredArrayID);
//     setSelectedFilmCategoriesNames(filteredArrayNames);
//     setError(null);
//   } else {
//     document
//       .getElementById(selectedElementID)
//       .classList.add("element-highlighted");
//     getSelectedCategories((filmCategoriesID) => [
//       ...filmCategoriesID,
//       selectedElementID,
//     ]);
//     setSelectedFilmCategoriesID((filmCategoriesID) => [
//       ...filmCategoriesID,
//       selectedElementID,
//     ]);
//     setSelectedFilmCategoriesNames((filmCategoriesNames) => [
//       ...filmCategoriesNames,
//       cateName,
//     ]);
//     // .classList.add("element-highlighted");
//   }
// };
// // };
