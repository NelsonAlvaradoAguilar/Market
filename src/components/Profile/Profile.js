import { useEffect, useState } from "react";
import { getUserProfile, logoutUser, token } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/home");
  };

  return (
    <>
      <div>
        <h2>Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
      </div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
