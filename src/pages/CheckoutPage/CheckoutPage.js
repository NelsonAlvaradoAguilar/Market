import React, { useState } from "react";
import "./CheckoutPage.scss";
import { createOrder } from "../../utils/api";

export default function CheckoutPage({
  user,
  cartItems = [],
  setCart,
  onOrderSubmit,
}) {
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name,
    phone: "",
    email: user?.email,
    date: "",
    time: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    accountHolder: "",
    routingNumber: "",
    accountNumber: "",
    userId: user?.id,
  });
  console.log(user);
  console.log(cartItems);

  const [paymentType, setPaymentType] = useState("card");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Calculate totals
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

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
    setError(null);

    try {
      // 1. Create the order
      const orderData = {
        name: shippingInfo.name,
        phone: shippingInfo.phone,
        email: shippingInfo.email,
        pickup_date: shippingInfo.date,
        pickup_time: shippingInfo.time,
        total: totalPrice,
        payment_type: paymentType,
        // Optionally add payment details, but best NOT to store sensitive info
      };
      const orderResponse = await createOrder(orderData);

      if (!orderResponse || !orderResponse.id) {
        setError("Failed to create order.");
        setSubmitting(false);
        return;
      }

      // 3. Optionally call parent handler
      if (onOrderSubmit) onOrderSubmit({ cartItems, shippingInfo });

      // 4. Clear cart
      if (setCart) setCart([]);
      localStorage.removeItem("cart");

      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success)
    return (
      <div className="checkoutpage__success">
        <h2>Thank you for your order!</h2>
        <p>A confirmation has been sent to your email.</p>
      </div>
    );

  return (
    <div className="checkoutpage" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1 className="checkoutpage__title">Checkout</h1>
      <section className="checkoutpage__summary">
        <h2 className="checkoutpage__summary-title">Order Summary</h2>
        <ul className="checkoutpage__summary-list">
          {cartItems.map((item) => (
            <li
              className="checkoutpage__summary-item"
              key={item.id || item.name}
            >
              <span className="checkoutpage__itemname">{item.name}</span>
              <span className="checkoutpage__itemdata">{item.quantity}</span>
              <span className="checkoutpage__itemdata">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p>
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </p>
      </section>
      <h2 className="checkoutpage__section-title">Pickup Information</h2>
      <div className="checkoutpage__pickup-fields">
        <label className="checkoutpage__label">
          Name
          <input
            className="checkoutpage__input"
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            required
          />
        </label>
        <label className="checkoutpage__label">
          Phone Number
          <input
            className="checkoutpage__input"
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            required
          />
        </label>
        <label className="checkoutpage__label">
          Email
          <input
            className="checkoutpage__input"
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            required
          />
        </label>
        <label className="checkoutpage__label">
          Pickup Date
          <input
            className="checkoutpage__input"
            type="date"
            name="date"
            value={shippingInfo.date}
            onChange={handleShippingChange}
            required
          />
        </label>
        <label className="checkoutpage__label">
          Pickup Time
          <input
            className="checkoutpage__input"
            type="time"
            name="time"
            value={shippingInfo.time}
            onChange={handleShippingChange}
            required
          />
        </label>
      </div>
      <section className="checkoutpage__section">
        <h2 className="checkoutpage__section-title">Payment Information</h2>
        <form className="checkoutpage__form" onSubmit={handleSubmit}>
          <div className="checkoutpage__payment-type">
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
            <div className="checkoutpage__card-fields">
              <input
                className="checkoutpage__input"
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={shippingInfo.cardNumber}
                onChange={handlePaymentChange}
                required
              />
              <input
                className="checkoutpage__input"
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={shippingInfo.expiry}
                onChange={handlePaymentChange}
                required
              />
              <input
                className="checkoutpage__input"
                type="text"
                name="cvc"
                placeholder="CVC"
                value={shippingInfo.cvc}
                onChange={handlePaymentChange}
                required
              />
            </div>
          )}

          {paymentType === "bank" && (
            <div className="checkoutpage__bank-fields">
              <input
                className="checkoutpage__input"
                type="text"
                name="accountHolder"
                placeholder="Account Holder Name"
                value={shippingInfo.accountHolder}
                onChange={handlePaymentChange}
                required
              />
              <input
                className="checkoutpage__input"
                type="text"
                name="routingNumber"
                placeholder="Routing Number"
                value={shippingInfo.routingNumber}
                onChange={handlePaymentChange}
                required
              />
              <input
                className="checkoutpage__input"
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={shippingInfo.accountNumber}
                onChange={handlePaymentChange}
                required
              />
            </div>
          )}

          <button
            className="checkoutpage__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Place Order"}
          </button>
          {error && <div className="checkoutpage__error">{error}</div>}
        </form>
      </section>
    </div>
  );
}
