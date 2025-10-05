import React, { useState } from "react";
import "./ProductGrid.scss";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";

const ProductGrid = ({ items = [] }) => (
  <div className="container">
    <div className="container__grid">
      {items.length > 0 ? (
        items.map((item) => <ProductCard key={item.name} item={item} />)
      ) : (
        <p>No products found.</p>
      )}
    </div>
  </div>
);

export default ProductGrid;
