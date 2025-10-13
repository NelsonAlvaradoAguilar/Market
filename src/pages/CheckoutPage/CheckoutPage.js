import React, { useState } from "react";
import "./CheckoutPage.scss";
export default function CheckoutPage({ cartItems = [], onOrderSubmit }) {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    email: "",
    date: "",
    time: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Calculate totals
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const [paymentType, setPaymentType] = useState("card"); // "car
  // Handle form changes
  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  const handlePaymentChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Integrate with backend or payment provider here
    await onOrderSubmit({ cartItems, shippingInfo });
    setSubmitting(false);
    // Optionally redirect or show confirmation
  };

  return (
    <div className="checkoutpage" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Checkout</h1>

      {/* Order Summary */}
      <section className="checkoutpage__summary">
        <h2>Order Summary</h2>
        <ul className="checkoutpage__summary-list">
          {cartItems.map((item) => (
            <li
              className="checkoutpage__summary-item"
              key={item.id || item.name}
            >
              <span className="checkoutpage__itemname">{item.name}</span>
              <span className="checkoutpage__itemdata">{item.quantity}</span>
              <span className="checkoutpage__itemdata">
                {" "}
                ${(item.price * item.quantity).toFixed(2)}
              </span>{" "}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </p>
      </section>
      <h2>Pickup Information</h2>
      <div className="checkoutpage__pickup-fields">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            required
          />
        </label>
        <label>
          Phone Number
          <input
            type="number"
            name="phone"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            required
          />
        </label>
        <label>
          email
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            required
          />
        </label>

        <label>
          Pickup Time
          <input
            type="time"
            name="time"
            value={shippingInfo.time}
            onChange={handleShippingChange}
            required
          />
        </label>
      </div>
      {/* Shipping Info */}
      <section>
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentType === "card"}
                onChange={() => setPaymentType("card")}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="bank"
                checked={paymentType === "bank"}
                onChange={() => setPaymentType("bank")}
              />
              Bank Account (ACH/EFT)
            </label>
          </div>

          {paymentType === "card" && (
            <>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={shippingInfo.cardNumber}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={shippingInfo.expiry}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={shippingInfo.cvc}
                onChange={handlePaymentChange}
                required
              />
            </>
          )}

          {paymentType === "bank" && (
            <>
              <input
                type="text"
                name="accountHolder"
                placeholder="Account Holder Name"
                value={shippingInfo.accountHolder || ""}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                name="routingNumber"
                placeholder="Routing Number"
                value={shippingInfo.routingNumber || ""}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={shippingInfo.accountNumber || ""}
                onChange={handlePaymentChange}
                required
              />
            </>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Processing..." : "Place Order"}
          </button>
        </form>
      </section>
    </div>
  );
}
