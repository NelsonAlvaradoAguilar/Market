import React from "react";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import WeeklyOrders from "../WeeklyOrders/WeeklyOrdes";
import AllOrdersAdmin from "../AllOrdersAdmin/AllOrdersAdmin";

export default function AdminDashboard({ user, onLogout }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome, {user?.name} (role: {user?.role})
      </p>

      <h2>All Orders (filter by date)</h2>
      <AllOrdersAdmin />
      <hr style={{ margin: "24px 0" }} />

      <h2>Weekly Orders by User (overview)</h2>

      <ProfilePage user={user} onLogout={onLogout} />
    </div>
  );
}
