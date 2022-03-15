import React from "react";
import { Link } from "react-router-dom";

function GroupList() {
  return (
    <div className="widget">
      <h4>Group List Component</h4>
      <Link to="/group-list">
        <li className="nav-links">Group List</li>
      </Link>
    </div>
  );
}

export default GroupList;
