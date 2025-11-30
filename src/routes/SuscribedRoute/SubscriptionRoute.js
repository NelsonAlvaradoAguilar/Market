// Simple subscription guard
import React from "react";
import "./SubscriptionRoute.scss";
import ShopPage from "../../components/ShopPage/ShopPage";
export default function SubscribedRoute({ user, children }) {
  const isActive = user?.subscription_status === "active";
  if (!user) return <div>Please log in.</div>;
  if (!isActive) return <ShopPage />;
  return children;
}
