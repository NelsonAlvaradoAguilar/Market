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
      {subCategories?.map((sub) => (
        <li
          key={sub}
          className={`filter__filtering${sub === selectedSub ? " active" : ""}`}
          onClick={() => onSelectSub(sub)}
        >
          {categoryData?.[sub]?.title || sub}
        </li>
      ))}
    </ul>
  </nav>
);

export default SubcategoryNav;
