import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Home from "./pages/Home/Home.js";
import About from "./components/About/About.js";
import Contact from "./pages/Contact/Contact.js";
import Store from "./pages/Store/Store.js";
import Legal from "./components/Legal/Legal.js";
import Footer from "./components/Footer/Footer.js";
import StoreSection from "./components/StoreSection/StoreSection.js";
import Header from "./components/Header/Header.js";
import ShopPage from "./components/ShopPage/ShopPage.js";
import Cart from "./components/Cart/Cart.js";
import CartPage from "./pages/CartPage/CartPage.js";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SignUpForm from "./components/SignUp/SignUp.js";
import UsersLandingPage from "./pages/UserLandingPage/UserLAndingPg.js";
const stripePromise = loadStripe("pk_test_..."); // Your Stripe TEST publishable key
export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  const updateCartQty = (itemName, newQty) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: newQty }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };
  const removeFromCart = (itemName) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.name === itemName
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/user-landing-page" element={<UsersLandingPage />} />
        <Route
          path="/shoppage"
          element={
            <ShopPage
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutPage cartItems={cart} setCart={setCart} />
            </Elements>
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cart}
              onRemove={removeFromCart}
              onUpdateQty={updateCartQty}
              setCart={setCart}
            />
          }
        />

        {/* ...other routes */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
//    <Route path="/grocery" element={<StoreSection data={data} />} />
// <Route path="/cart" element={<Cart />} />
