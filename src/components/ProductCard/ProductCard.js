import React from "react";
import "./ProductCard.scss";
const ProductCard = ({ item, addToCart }) => {
  console.log(item.id);

  return (
    <div className="product-card">
      <img className="product-card__img" src={item.imageUrl} alt={item.name} />
      <h4 className="product-card__title">{item.name}</h4>
      <p className="product-card__origin">{item.origin}</p>

      <button
        className="product-card__add-btn"
        onClick={() => addToCart(item.id, 1)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
