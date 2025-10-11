import React, { useEffect, useState } from "react";
import inventory from "../../data/Inventory.json";
import Sidebar from "../Sidebar/Sidebar";
import CategoryInfo from "../CategoryInfo/CategoryInfo";
import SubcategoryNav from "../SubCategory/SubCategory";
import ProductGrid from "../ProductGrid/ProductGrid";
import { images } from "../../data/images";
import "./ShopPage.scss";
import SearchBar from "../SearchBar/SearchBar";
import FeaturedCarousel from "../Carousel/Carousel";
import Cart from "../Cart/Cart";

const categoryList = Object.keys(inventory);

const ShopPage = ({ addToCart, removeFromCart, cart }) => {
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const categoryData = inventory[selectedCategory];
  const subCategories = categoryData.categories
    ? Object.keys(categoryData.categories)
    : [];
  const allItems = Object.values(inventory)
    .map((section) => section.items || [])
    .flat();
  const [selectedSub, setSelectedSub] = useState(subCategories[0] || null);
  const items = categoryData.items;

  const searchedItems = searchTerm
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  // Filtered items for subcategory
  const filteredItems =
    selectedSub && items
      ? items.filter((item) => item.category === selectedSub)
      : items;

  useEffect(
    () => {
      setSelectedSub(subCategories[0] || null);
    },
    [selectedCategory],
    [subCategories]
  );

  const itemsToDisplay = searchTerm ? searchedItems : filteredItems;
  const settings = {
    dots: false,
  };

  return (
    <section className="shop-page">
      <div className="shop-page__carousel">
        <FeaturedCarousel items={images} settings={settings} />
      </div>
      {
        console.log(
          categoryList
        ) /* Sidebar or dropdown for category selection */
      }
      {/* Main Content */}{" "}
      <div className="shop-page__search">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="shop-page__menu">
        {" "}
        <div>
          {" "}
          <Sidebar
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <CategoryInfo
            categoryData={categoryData}
            selectedCategory={selectedCategory}
          />
          <SubcategoryNav
            subCategories={subCategories}
            categoryData={categoryData.categories} // <-- note this!
            selectedSub={selectedSub}
            onSelectSub={setSelectedSub}
          />
        </div>
        <div>
          <ProductGrid
            items={itemsToDisplay}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
//   <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
