import React from "react";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
export default function AdminDashboard({ user, onLogout }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>

      {/* If you want to show some admin info: */}
      <p>
        Welcome, {user?.name} (role: {user?.role})
      </p>

      {/* If you want to show the full profile, render it directly, NOT inside <p> */}
      <ProfilePage user={user} onLogout={onLogout} />
    </div>
  );
}
