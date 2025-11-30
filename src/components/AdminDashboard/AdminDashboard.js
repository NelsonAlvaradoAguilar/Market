import React from "react";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import WeeklyOrders from "../WeeklyOrders/WeeklyOrdes";
import AllOrdersAdmin from "../AllOrdersAdmin/AllOrdersAdmin";
import AdminProductManager from "../AdminProductManager/AdminProductManager";
import { Link, NavLink } from "react-router-dom";
export default function AdminDashboard({
  user,
  onLogout,
  handleSubscribe,
  isSubscribed,
}) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>

      <ProfilePage
        user={user}
        onLogout={onLogout}
        handleSubscribe={handleSubscribe}
        isSubscribed={isSubscribed}
      />

      <NavLink to="/admin/products" activeClassName="active">
        Manage Products
      </NavLink>
      <h2>All Orders (filter by date)</h2>
      <AllOrdersAdmin />

      <hr style={{ margin: "24px 0" }} />
    </div>
  );
}
