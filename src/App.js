import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  addToCart,
  getAuthorized,
  getCart,
  getToken,
  getUserSession,
  logOut,
  removeFromCart,
  updateCartQty,
} from "./utils/api.js";
import { calculateSubtotal, isCartFull } from "./utils/cartUtil.js";

import Home from "./pages/Home/Home.js";
import About from "./components/About/About.js";
import Contact from "./pages/Contact/Contact.js";
import Store from "./pages/Store/Store.js";

import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import ShopPage from "./components/ShopPage/ShopPage.js";

import CartPage from "./pages/CartPage/CartPage.js";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SignUpForm from "./components/SignUp/SignUp.js";

import LandingPage from "./pages/LandingPage/LandingPague.js";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.js";
import LoginForm from "./components/Login/Login.js";
import AdminRoute from "./pages/AdminRoute/AdminRoute.js";
import SubscribedRoute from "./routes/SuscribedRoute/SubscriptionRoute.js";

const stripePromise = loadStripe("pk_test_..."); // Your Stripe TEST publishable key

export default function App() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(getToken());
  const [userSession, setUserSession] = useState(getUserSession());
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  const cartFull = isCartFull(cart);

  // Load user profile / session
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getAuthorized();
        console.log("userData from API:", userData);
        setUser(userData);
        setUserSession(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Profile load error:", err);

        if (err.response?.status === 401) {
          // Token expired
          setUser(null);
          setUserSession(null);
          setToken(null);
          logOut();
        } else {
          setUser(null);
          setUserSession(null);
        }
      }
    };

    if (userSession) {
      // Use stored session immediately on refresh
      setUser(userSession);
    } else if (token) {
      // No stored session but we have a token → fetch from API
      fetchProfile();
    } else {
      setUser(null);
      setUserSession(null);
    }
  }, [token, userSession]);

  // Load cart on token change

  const reloadCart = async () => {
    try {
      const data = await getCart();
      console.log("Cart data:", data);

      const safeData = Array.isArray(data) ? data : [];
      setCart(safeData);
      setSubtotal(calculateSubtotal(safeData));
    } catch (err) {
      console.error("reloadCart error:", err);

      if (err.response?.status === 401) {
        setCart([]);
        setSubtotal(0);
        setToken(null);
        logOut();
      }
    }
  };

  // Keep subscription status in sync with user
  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      setIsSubscribed(user.subscription_status || "");
    } else {
      setIsSubscribed("");
    }
  }, [user]);
  useEffect(() => {
    if (token) {
      reloadCart();
    } else {
      setCart([]);
      setSubtotal(0);
    }
  }, [token]);
  // Handlers
  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      // optional: reload cart here if you want immediate UI update
      reloadCart();
      const data = await getCart();
      const safeData = Array.isArray(data) ? data : [];
      setCart(safeData);
      setSubtotal(calculateSubtotal(safeData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCartQty = async (itemId, newQty) => {
    try {
      await updateCartQty(itemId, newQty);
      // optional: reload cart
      reloadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      reloadCart();
      // optional: reload cart
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logOut(); // clears localStorage (token + user)
    setToken(null); // clear React state
    setUser(null);
    setUserSession(null);
    setCart([]);
    setSubtotal(0);
    setIsSubscribed("");
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route
          path="/landing"
          element={<Home user={user} onLogout={handleLogout} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />

        <Route path="/signup" element={<SignUpForm setToken={setToken} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route
          path="/profile"
          element={<ProfilePage user={user} onLogout={handleLogout} />}
        />

        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutPage user={user} cartItems={cart} setCart={setCart} />
            </Elements>
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              user={user}
              cartItems={cart}
              isSubscribed={isSubscribed}
              subtotal={subtotal}
              addToCart={handleAddToCart}
              onRemove={handleRemoveFromCart}
              onUpdateQty={handleUpdateCartQty}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard user={user} />
            </AdminRoute>
          }
        />
        <Route
          path="/shoppage"
          element={
            <SubscribedRoute user={user}>
              <ShopPage
                user={user}
                cartItems={cart}
                isSubscribed={isSubscribed}
                subtotal={subtotal}
                addToCart={handleAddToCart}
                onRemove={handleRemoveFromCart}
                onUpdateQty={handleUpdateCartQty}
                setCart={setCart}
                getCart={getCart}
                cart={cart}
                cartFull={cartFull}
              />
            </SubscribedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer user={user} />
    </BrowserRouter>
  );
}
//    <Route path="/grocery" element={<StoreSection data={data} />} />
// <Route path="/cart" element={<Cart />} />
/* <Route
   path="/shoppage"
   element={
     <ShopPage
       cart={cart}
       addToCart={handleAddToCart}
       removeFromCart={handleRemoveFromCart}
     />
   }
 />;*/
