import React from "react";

import "./CartItem.scss";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="card">
      <div>{item.name}</div>

      <div className="card__buttons">
        <button
          onClick={() => onDecrease(item.name)}
          disabled={item.quantity <= 1}
        >
          –
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.name)}>+</button>
      </div>
    </div>
  );
}
//   <div style={{ color: "#888", fontSize: 14 }}>{item.price}</div>
