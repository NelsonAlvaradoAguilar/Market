import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import {
  addToCart,
  getAuthorized,
  getCart,
  getOrders,
  removeFromCart,
  updateCartQty,
} from "./utils/api.js";
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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState("");

  const [subtotal, setSubtotal] = useState();
  console.log(subtotal);
  console.log(isSubscribed);

  // Utility to reload cart from backend
  const reloadCart = async () => {
    const data = await getCart();
    console.log(data);

    setCart(data);
    setSubtotal(
      data.reduce((sum, cart) => sum + cart.price * cart.quantity, 0)
    );
  };

  // Handler: Add to cart
  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      await reloadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Handler: Update cart quantity
  const handleUpdateCartQty = async (itemId, newQty) => {
    try {
      await updateCartQty(itemId, newQty);
      await reloadCart();
    } catch (err) {
      // handle error
    }
  };

  // Handler: Remove from cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      await reloadCart();
    } catch (err) {
      // handle error
    }
  };

  // Load user profile on token change
  useEffect(() => {
    const getProfile = async () => {
      try {
        const userData = await getAuthorized(); // userData is the user object
        setUser(userData);
      } catch (err) {
        console.error("Profile load error:", err);
        setUser(null);
      }
    };

    if (token) {
      getProfile();
    } else {
      setUser(null);
    }
  }, [token]);
  // Load cart on token change
  useEffect(() => {
    if (token) {
      reloadCart();
    }
  }, [token]);

  // Debug: log user updates
  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      setIsSubscribed(user.subscription_status);
    }
  }, [user]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/landing" element={<LandingPage user={user} />} />
        <Route path="/home" element={<Home />} />
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
