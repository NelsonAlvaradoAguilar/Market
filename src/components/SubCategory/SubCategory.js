import React from "react";
import "./SubCategory.scss";
const SubcategoryNav = ({
  subCategories,
  categoryData,
  selectedSub,
  onSelectSub,
}) => (
  <nav className="filter">
    <ul className="filter__list">
      {subCategories.map((sub) => (
        <li
          key={sub.id}
          className={`filter__filtering${
            sub.id === selectedSub ? " active" : ""
          }`}
          onClick={() => onSelectSub(sub.id)}
        >
          {sub.name}
        </li>
      ))}
    </ul>
  </nav>
);

export default SubcategoryNav;
