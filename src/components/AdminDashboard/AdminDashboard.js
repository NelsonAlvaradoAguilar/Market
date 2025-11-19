import React from "react";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import WeeklyOrders from "../WeeklyOrders/WeeklyOrdes";
import UserOrdersAdmin from "../UserOrdersAdmin/UserOrdersAdmin";

export default function AdminDashboard({ user, onLogout }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>

      <p>
        Welcome, {user?.name} (role: {user?.role})
      </p>

      <h2>Weekly Orders by User (overview)</h2>

      <hr style={{ margin: "24px 0" }} />

      <h2>User Orders (filter by user + date / last N)</h2>
      <UserOrdersAdmin />

      {/* Full profile below if you want */}
      <ProfilePage user={user} onLogout={onLogout} />
    </div>
  );
}
