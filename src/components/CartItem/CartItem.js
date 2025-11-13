import React from "react";
import "./CartItem.scss";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="card">
      <div className="card__info">
        <span className="card__name">{item.name}</span>
        <span className="card__price">
          $
          {item.price
            ? Number(item.price).toFixed(2)
            : item.product_price
            ? Number(item.product_price).toFixed(2)
            : "0.00"}
        </span>
      </div>

      <div className="card__buttons">
        <button onClick={() => onDecrease(item.productId, item.quantity)}>
          –
        </button>
        <span>{item?.quantity}</span>
        <button onClick={() => onIncrease(item.productId, item.quantity)}>
          +
        </button>
      </div>

      <button onClick={() => onRemove(item.productId)}>Remove All</button>
    </div>
  );
}
