import React from "react";
import { Link } from "react-router-dom";
// import "../components.css";

function Category() {
  return (
    <div className="">
      <h4 className="title">Category Component</h4>
      <Link to="/category">
        <li className="nav-links">Categories</li>
      </Link>
      <form className="add">
        <label htmlFor="categoryName">Category:</label>
        <input type="text" name="categoryName" />
        <label htmlFor="majorCategory">Major Category:</label>
        <input type="text" name="majorCategory" />
        <button>add a new category</button>
      </form>
      <form className="delete">
        <label htmlFor="categoryName">Category:</label>
        <input type="text" name="id" required />
        {/* <label htmlFor="majorCategory">Major Category:</label> */}
        <button>delete a category</button>
      </form>
    </div>
  );
}

export default Category;
