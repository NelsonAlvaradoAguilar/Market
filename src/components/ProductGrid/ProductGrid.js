import React, { useState } from "react";
import "./ProductGrid.scss";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";

const ProductGrid = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchedItems = searchTerm
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : items;

  return (
    <div className="container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container__grid">
        {searchedItems.length > 0 ? (
          searchedItems.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
