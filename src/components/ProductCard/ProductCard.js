import React from "react";
import "./ProductCard.scss";
const ProductCard = ({
  item,
  addToCart,
  onRemove,
  isInCart,
  subtotal,
  cartFull,
}) => {
  const productId = item.id;
  const numericSubtotal = Number(subtotal) || 0;

  return (
    <div className="product-card">
      <img className="product-card__img" src={item.imageUrl} alt={item.name} />
      <h4 className="product-card__title">{item?.name}</h4>
      <p className="product-card__origin">{item?.origin}</p>
      <div>{item?.quantity}</div>
      {!cartFull && !isInCart && (
        <button
          className="product-card__button"
          onClick={() => addToCart(productId)}
        >
          Buy
        </button>
      )}
      {cartFull && isInCart && (
        <button
          className="product-card__button product-card__button--remove"
          onClick={() => onRemove(productId, item.quantity - 1)}
        >
          Remove from box
        </button>
      )}
    </div>
  );
};

export default ProductCard;
