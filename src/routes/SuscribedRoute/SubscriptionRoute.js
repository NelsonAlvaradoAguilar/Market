// Simple subscription guard
import React from "react";
import "./SubscriptionRoute.scss";
export default function SubscribedRoute({ user, children }) {
  const isActive = user?.subscription_status === "active";
  if (!user) return <div>Please log in.</div>;
  if (!isActive)
    return (
      <div className="no-subscription">
        <p>
          {
            " You need a Membership to our Boxes. Join our Weekly Box to see this."
          }
        </p>
      </div>
    );
  return children;
}
