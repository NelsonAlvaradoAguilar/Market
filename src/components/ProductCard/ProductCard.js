import React from "react";
import "./ProductCard.scss";
const ProductCard = ({ item, addToCart, subtotal, isSubscribed, onRemove }) => {
  console.log(item.id);

  return (
    <div className="product-card">
      <img className="product-card__img" src={item.imageUrl} alt={item.name} />
      <h4 className="product-card__title">{item.name}</h4>
      <p className="product-card__origin">{item.origin}</p>

      {(subtotal <= 50 && (
        <button
          className="product-card__button"
          onClick={() => addToCart(item.id)}
        >
          Add to Cart
        </button>
      )) ||
        (subtotal >= 50 && (
          <button onClick={() => onRemove(item.id)}>remove</button>
        ))}
    </div>
  );
};

export default ProductCard;
