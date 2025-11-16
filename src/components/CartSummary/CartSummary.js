import { useNavigate } from "react-router-dom";
import React from "react";
import "./CartSummary.scss";
export default function CartSummary({
  items,
  onCheckout,
  user,
  subtotal,
  isSubscribed,
}) {
  const BOX_TARGET = 60;

  const navigate = useNavigate();

  const isFull = subtotal >= BOX_TARGET;
  return (
    <div className="cart-summary">
      {isSubscribed && isFull && <h2>Your Basket is full</h2>}

      {isSubscribed && subtotal < 60 && <p>Add more to fill your Box.</p>}

      <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
    </div>
  );
}
/** <h2>Subtotal: ${subtotal.toFixed(2)}</h2> */
