// import React, { createContext, useContext, useState } from "react";
// import { CategoryContext } from "../context/CategoryContext";

// export const CategoryStateContext = createContext();

// export const CategoryStateProvider = (props) => {
//   const [categoriesDB, setCategoriesDB] = useContext(CategoryContext);
//   const { categoryAction } = useContext(CategoryContext);
//   const [selectedFilmCategoriesID, setSelectedFilmCategoriesID] = useState([]);
//   // console.log(categoriesDB);
//   const [selectedFilmCategoriesNames, setSelectedFilmCategoriesNames] =
//     useState([]);
//   // const [selectedElementID, setSelectedElementID] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedid_cate, setSelectedid_cate] = useState();
//   const [error, setError] = useState(null);
//   // const [search, setSearch] = useState();
//   const [id, setId] = useState();

//   return (
//     <CategoryStateContext.Provider
//       value={[
//         categoriesDB,
//         setCategoriesDB,
//         categoryAction,
//         selectedFilmCategoriesID,
//         setSelectedFilmCategoriesID,
//         selectedFilmCategoriesNames,
//         setSelectedFilmCategoriesNames,
//         searchTerm,
//         setSearchTerm,
//         selectedid_cate,
//         setSelectedid_cate,
//         error,
//         setError,
//         id,
//         setId,
//       ]}
//     >
//       {props.children}
//     </CategoryStateContext.Provider>
//   );
// };
