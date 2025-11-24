import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmSubscription } from "../../utils/api";
export default function SubscriptionSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming");

  useEffect(() => {
    const confirm = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        await confirmSubscription(sessionId);

        setStatus("success");

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
