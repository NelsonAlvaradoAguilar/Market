import React from "react";
import "./ProductCard.scss";
const ProductCard = ({ item, addToCart, subtotal, isSubscribed, onRemove }) => {
  return (
    <div className="product-card">
      <img className="product-card__img" src={item.imageUrl} alt={item.name} />
      <h4 className="product-card__title">{item?.name}</h4>
      <h4 className="product-card__title">${item?.quantity}</h4>
      <p className="product-card__origin">{item?.origin}</p>

      <button
        className="product-card__button"
        onClick={() => addToCart(item.id)}
      >
        Add to Box
      </button>
    </div>
  );
};

export default ProductCard;
