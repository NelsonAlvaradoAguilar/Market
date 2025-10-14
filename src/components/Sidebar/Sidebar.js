import React from "react";
import "./Sidebar.scss";

const Sidebar = ({ categoryList, selectedCategory, onSelectCategory }) => (
  <nav className="sidebar">
    <ul className="sidebar__list">
      {categoryList.map((cat) => (
        <li
          key={cat.id}
          className={cat.id === selectedCategory ? "active" : ""}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
