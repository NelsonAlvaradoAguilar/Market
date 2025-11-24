import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmSubscription } from "../../utils/api";

export default function SubscriptionSuccess({ refreshUser }) {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        // 1) Confirm subscription on backend (updates DB)
        await confirmSubscription(sessionId);

        // 2) Refresh user in App state + localStorage
        if (typeof refreshUser === "function") {
          await refreshUser();
        }

        setStatus("success");

        // 3) Redirect to profile
        setTimeout(() => {
          navigate("/profile");
        }, 800);
      } catch (err) {
        console.error("Subscription confirmation failed:", err);
        setStatus("error");
      }
    };

    run();
  }, [searchParams, navigate, refreshUser]);

  if (status === "processing") return <p>Confirming your subscription...</p>;
  if (status === "error")
    return <p>There was a problem confirming your subscription.</p>;
  return <p>Subscription confirmed! Redirecting to your profile...</p>;
}
