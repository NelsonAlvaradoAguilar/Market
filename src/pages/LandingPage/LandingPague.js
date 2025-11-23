import { use, useState } from "react";
import SignUpForm from "../../components/SignUp/SignUp";
import LoginForm from "../../components/Login/Login";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import ProfilePage from "../ProfilePage/ProfilePage";

function LandingPage({ user }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Only render ProfilePage when user exists */}
      {user && <ProfilePage user={user} />}
      {!user && (
        <div
          style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}
        >
          <h1>Welcome to Your Store</h1>
          <p>Please sign up or log in to continue.</p>
          <div>
            <button
              onClick={() => navigate("/signup")}
              style={{ marginRight: 8 }}
            >
              Sign Up
            </button>
            <button onClick={() => navigate("/login")}>Log In</button>
            <button
              onClick={() => navigate("/profile")}
              style={{ marginLeft: 8 }}
            >
              Your profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default LandingPage;
