import React, { useState } from "react";
import "./ProductGrid.scss";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";

const ProductGrid = ({ items = [], addToCart }) => (
  <ul className="product">
    {items.length > 0 ? (
      items.map((item) => (
        <li className="product__card" key={item.name}>
          <ProductCard item={item} addToCart={addToCart} />
        </li>
      ))
    ) : (
      <li>
        <p>No products found.</p>
      </li>
    )}
  </ul>
);

export default ProductGrid;
