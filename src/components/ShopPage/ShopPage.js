import React, { useEffect, useState } from "react";
import inventory from "../../data/Inventory.json";
import Sidebar from "../Sidebar/Sidebar";
import CategoryInfo from "../CategoryInfo/CategoryInfo";
import SubcategoryNav from "../SubCategory/SubCategory";
import ProductGrid from "../ProductGrid/ProductGrid";
import "./ShopPage.scss";
const categoryList = Object.keys(inventory);

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const categoryData = inventory[selectedCategory];
  const subCategories = categoryData.categories
    ? Object.keys(categoryData.categories)
    : [];

  const [selectedSub, setSelectedSub] = useState(subCategories[0] || null);
  const items = categoryData.items;

  // Filtered items for subcategory
  const filteredItems =
    selectedSub && items
      ? items.filter((item) => item.category === selectedSub)
      : items;
  useEffect(() => {
    setSelectedSub(subCategories[0] || null);
  }, [selectedCategory]);
  return (
    <div className="shop-page">
      {/* Sidebar or dropdown for category selection */}
      <Sidebar
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main>
        <CategoryInfo data={categoryData.category} />
        {/* Sub-category navigation for produce */}
        <div className="shop-page__content">
          {subCategories && (
            <SubcategoryNav
              subCategories={subCategories}
              categoryData={categoryData.categories}
              selectedSub={selectedSub}
              onSelectSub={setSelectedSub}
            />
          )}
          <ProductGrid items={filteredItems} />
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
