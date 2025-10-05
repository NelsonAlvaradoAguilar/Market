import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ item }) => (
  <div className="product-card">
    <img className="product-card__img" src={item.imageUrl} alt={item.name} />
    <h4 className="product-card__title">{item.name}</h4>
    <p className="product-card__origin">{item.origin}</p>
  </div>
);

export default ProductCard;
