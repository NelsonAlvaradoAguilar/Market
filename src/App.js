import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Await,
} from "react-router-dom";
import {
  addToCart,
  getAuthorized,
  getCart,
  removeFromCart,
  updateCartQty,
} from "./utils/api.js";
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
import Profile from "./components/Profile/Profile.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.js";
import LoginForm from "./components/Login/Login.js";
import Products from "./components/StoreSection/StoreSection.js";
const stripePromise = loadStripe("pk_test_..."); // Your Stripe TEST publishable key
export default function App() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Utility to reload cart from backend
  const reloadCart = async () => {
    const data = await getCart();
    console.log(data);

    setCart(data);
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
      const data = await getAuthorized();
      setUser(data.data);
    };
    getProfile();
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
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/userlanding" element={<UsersLandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/shoppage"
          element={
            <ShopPage
              cart={cart}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutPage user={user} cartItems={cart} setCart={setCart} />
            </Elements>
          }
        />

        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cart}
              onRemove={handleRemoveFromCart}
              onUpdateQty={handleUpdateCartQty}
              setCart={setCart}
            />
          }
        />

        {/* ...other routes */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer user={user} />
    </BrowserRouter>
  );
}
//    <Route path="/grocery" element={<StoreSection data={data} />} />
// <Route path="/cart" element={<Cart />} />
