import React from "react";
import "./ProductCard.scss";
const ProductCard = ({
  item,
  addToCart,
  onRemove,
  isInCart,
  subtotal,
  cartFull,
  selected,
  isSubscribed, // <-- receive the prop
}) => {
  // ...rest of your code

  return (
    <div className={`product-card${selected ? " product-card--selected" : ""}`}>
      <img className="product-card__img" src={item.imageUrl} alt={item.name} />
      <h4 className="product-card__title">{item?.name}</h4>
      <p className="product-card__origin">{item?.origin}</p>
      <div>{item?.quantity}</div>
      {item.category_id === 6 && !isInCart && (
        <button
          className="product-card__button"
          onClick={() => addToCart(item.id)}
          disabled={!isSubscribed || cartFull}
          title={
            !isSubscribed
              ? "Subscribe to enable purchasing"
              : cartFull
              ? "Box is full"
              : ""
          }
        >
          {!isSubscribed
            ? "Subscribe to buy"
            : cartFull
            ? "Box is full"
            : "Buy"}
        </button>
      )}

      {isInCart && (
        <button
          className="product-card__button product-card__button--remove"
          onClick={() => onRemove(item.id)}
          disabled={!isSubscribed}
          title={!isSubscribed ? "Subscribe to enable removing" : ""}
        >
          {!isSubscribed ? "Subscribe to remove" : "Remove from box"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
