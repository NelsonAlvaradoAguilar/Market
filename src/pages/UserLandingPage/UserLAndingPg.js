import { use, useState } from "react";
import SignUpForm from "../../components/SignUp/SignUp";
import LoginForm from "../../components/Login/Login";
import { useNavigate } from "react-router-dom";

export default function UsersLandingPage() {
  const [show, setShow] = useState("none");
  const navigate = useNavigate();
  if (show === "register")
    return (
      <div>
        <h2>Sign Up</h2>
        <SignUpForm onRegister={() => setShow("none")} />
        <button onClick={() => setShow("none")}>Back</button>
      </div>
    );

  if (show === "login")
    return (
      <div>
        <h2>Log In</h2>
        <LoginForm onLogin={() => navigate("/profile")} />
        <button onClick={() => setShow("none")}>Back</button>
      </div>
    );

  // Default: landing page
  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>Welcome to Your Store</h1>
      <p>Please sign up or log in to continue.</p>
      <button onClick={() => setShow("register")} style={{ marginRight: 8 }}>
        Sign Up
      </button>
      <button onClick={() => setShow("login")}>Log In</button>
    </div>
  );
}
