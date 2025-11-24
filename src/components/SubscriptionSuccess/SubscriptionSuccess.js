import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/api"; // or wherever you keep this

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming"); // "confirming" | "success" | "error"

  useEffect(() => {
    const confirm = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        const token = getToken();
        await axios.post(
          `${API_BASE}/subscriptions/confirm`,
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStatus("success");

        // Option 1: reload page to refresh user from backend
        setTimeout(() => {
          navigate("/profile", { replace: true });
          window.location.reload();
        }, 1500);
      } catch (err) {
        console.error("Error confirming subscription:", err);
        setStatus("error");
      }
    };

    confirm();
  }, [searchParams, navigate]);

  if (status === "confirming") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Finishing your subscription…</h1>
        <p>Please wait a moment while we confirm your payment.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>There was a problem confirming your subscription.</h1>
        <p>You can return to your profile and try again.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Subscription confirmed!</h1>
      <p>Redirecting you to your profile…</p>
    </div>
  );
}
