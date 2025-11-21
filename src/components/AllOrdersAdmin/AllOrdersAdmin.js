import React, { useEffect, useState } from "react";
import { getAllOrdersAdmin, getOrderByIdAdmin } from "../../utils/api";
import "./AllOrdersAdmin.scss";
const AllOrdersAdmin = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    const data = await getAllOrdersAdmin(start || undefined, end || undefined);
    setOrders(data);
    setLoading(false);
  };

  // initial load: all orders
  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = async (orderId) => {
    try {
      setDetailLoading(true);
      setDetailError("");
      const data = await getOrderByIdAdmin(orderId);
      setSelectedOrder(data);
    } catch (err) {
      setDetailError("Failed to load order details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setDetailError("");
  };

  return (
    <div className="all-orders-admin">
      <h2>All Orders</h2>

      <div className="all-orders-admin__filters">
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

        <div style={{ alignSelf: "flex-end" }}>
          <button onClick={loadOrders} disabled={loading}>
            {loading ? "Loading..." : "Apply filter"}
          </button>
        </div>
      </div>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found for this range.</p>
      )}

      {!loading && orders.length > 0 && (
        <div className="all-orders-admin__table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Created At</th>
                <th>User</th>
                <th>Pickup Date</th>
                <th>Total</th>
                <th>Payment TypE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(o.id)}
                >
                  <td>{o.id}</td>
                  <td>{new Date(o.created_at).toLocaleString()}</td>
                  <td>
                    {o.user_name ||
                      o.customer_name ||
                      o.user_email ||
                      o.customer_email}{" "}
                    (ID: {o.user_id})
                  </td>
                  <td>{o.pickup_date}</td>
                  <td>${Number(o.total).toFixed(2)}</td>
                  <td>{o.payment_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Simple modal for order details */}
      {selectedOrder && (
        <div className="all-orders-admin__overlay" onClick={closeModal}>
          <div
            className="all-orders-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Order #{selectedOrder.id}</h3>

            {detailLoading && <p>Loading details...</p>}
            {detailError && <p style={{ color: "red" }}>{detailError}</p>}

            {!detailLoading && !detailError && (
              <>
                <h4>User Info</h4>
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.user_name || selectedOrder.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedOrder.user_email || selectedOrder.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.phone}
                </p>

                <h4>Order Info</h4>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Pickup:</strong> {selectedOrder.pickup_date}{" "}
                  {selectedOrder.pickup_time}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {Number(selectedOrder.total).toFixed(2)}
                </p>
                <p>
                  <strong>Payment Type:</strong> {selectedOrder.payment_type}
                </p>

                <h4>Items</h4>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.product_name}</td>
                          <td>{item.quantity}</td>
                          <td>${Number(item.product_price || 0).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items found for this order.</p>
                )}
              </>
            )}

            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrdersAdmin;
