import React from "react";
import "./Sidebar.scss";

const Sidebar = ({ categoryList, selectedCategory, onSelectCategory }) => (
  <nav className="sidebar">
    <ul className="sidebar__list">
      {categoryList.map((cat) => (
        <li
          key={cat}
          className={cat === selectedCategory ? "active" : ""}
          onClick={() => onSelectCategory(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
