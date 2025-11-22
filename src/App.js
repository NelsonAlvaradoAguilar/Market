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
  console.log(subtotal);
  console.log(isSubscribed);

  // Utility to reload cart from backend

  // Handler: Add to cart
  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      // await reloadCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Handler: Update cart quantity
  const handleUpdateCartQty = async (itemId, newQty) => {
    try {
      await updateCartQty(itemId, newQty);
      //await reloadCart();
    } catch (err) {
      // handle error
    }
  };

  // Handler: Remove from cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      // await reloadCart();
    } catch (err) {
      // handle error
    }
  };

  // Load user profile on token change
  useEffect(() => {
    const getProfile = async () => {
      try {
        const userData = await getAuthorized();
        setUser(userData);
      } catch (err) {
        console.error("Profile load error:", err);

        if (err.response?.status === 401) {
          // Token expired
          setUser(null);
          setToken(null);
          logOut();
          // Optional: redirect to login
          // navigate("/login");
        } else {
          setUser(null);
        }
      }
    };

    if (userSession) {
      setUser(userSession);
    } else if (token) {
      getProfile();
    } else {
      setUser(null);
    }
  }, [token]);
  // Load cart on token change
  /*useEffect(() => {
    if (token) {
      reloadCart();
    }
  }, [token]);*/
  // Debug: log user updates
  useEffect(() => {
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
          // Token expired → clear everything related to auth/cart
          setCart([]);
          setSubtotal(0);
          setToken(null);
          logOut(); // assuming this clears localStorage (token, user, etc.)
          // Optionally redirect to login if you use react-router's navigate
          // navigate("/login");
        }
      }
    };

    if (token) {
      reloadCart();
    } else {
      // No token → ensure cart is empty
      setCart([]);
      setSubtotal(0);
    }
  }, [token]);
  useEffect(() => {
    if (user) {
      console.log("User updated:", user);
      setIsSubscribed(user.subscription_status);
    }
  }, [user]);
  const handleLogout = () => {
    logOut();
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
