import React, { useEffect, useState } from "react";
import { getUsers, getUserOrders } from "../../utils/api";
import "./UserOrdesAdmin.scss";
const UserOrdersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [limit, setLimit] = useState("5"); // last 5 orders by default
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load users for dropdown
  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const loadOrders = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    const data = await getUserOrders(selectedUserId, {
      start: start || undefined,
      end: end || undefined,
      limit: limit || undefined,
    });
    setOrders(data);
    setLoading(false);
  };

  return (
    <div className="user-orders-admin">
      <div
        className="user-orders-admin"
        style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
      >
        <div>
          <label>User</label>
          <br />
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.email} (ID: {u.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start date</label>
          <br />
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div>
          <label>End date</label>
          <br />
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <div>
          <label>Limit (last N orders)</label>
          <br />
          <input
            type="number"
            min="1"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>

        <div style={{ alignSelf: "flex-end" }}>
          <button onClick={loadOrders} disabled={loading || !selectedUserId}>
            {loading ? "Loading..." : "Load orders"}
          </button>
        </div>
      </div>

      {!loading && selectedUserId && orders.length === 0 && (
        <p>No orders found for this user / range.</p>
      )}

      {!loading && orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Created At</th>
              <th>Pickup Date</th>
              <th>Total</th>
              <th>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
                <td>{o.pickup_date}</td>
                <td>${Number(o.total).toFixed(2)}</td>
                <td>{o.payment_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrdersAdmin;
