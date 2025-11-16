import { useEffect, useState } from "react";
import { getAuthorized, logOut, token } from "../../utils/api";
import Profile from "../../components/Profile/Profile";
import Home from "../Home/Home";
import { createCheckoutSession } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user, onLogout }) {
  const handleSubscribe = async () => {
    try {
      const { url } = await createCheckoutSession();
      window.location.href = url; // redirect to Stripe Checkout
    } catch (err) {
      console.error("Subscribe error:", err);
      alert("Could not start subscription. Please try again.");
    }
  };

  const isActive = user?.subscription_status === "active";
  return !user ? (
    <div>No user data found.</div>
  ) : (
    <>
      <Profile user={user} onLogout={onLogout} />
      {!isActive && (
        <button onClick={handleSubscribe}>Subscribe to Monthly Box</button>
      )}

      {isActive && (
        <p>
          You are subscribed to the Weekly Box. Your box will be prepared for
          pickup on Monday.
        </p>
      )}
    </>
  );
}
