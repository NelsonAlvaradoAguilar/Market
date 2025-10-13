import { useNavigate } from "react-router-dom";
import React from "react";
import "./CartSummary.scss";
export default function CartSummary({ items, onCheckout }) {
  const navigate = useNavigate();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="cart-summary">
      <div className="cart-summary__subtotal">
        Subtotal: ${subtotal.toFixed(2)}
      </div>
      <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
    </div>
  );
}
