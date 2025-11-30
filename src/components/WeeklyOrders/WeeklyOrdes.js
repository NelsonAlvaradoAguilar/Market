import React, { useEffect, useState } from "react";
import { getWeeklyOrders } from "../../utils/api";

const WeeklyOrders = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  function yearWeekToDate(yearweek) {
    const year = Math.floor(yearweek / 100);
    const week = yearweek % 100;
    // ISO week 1 is the week with the first Thursday of the year
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = new Date(simple);
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }
  // Example: last 4 weeks
  const fetchData = async () => {
    setLoading(true);
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 28);

    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);

    // Pass email as third argument
    const data = await getWeeklyOrders(startStr, endStr, undefined, email);
    setRows(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  if (loading) return <p>Loading weekly orders...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2em auto" }}>
      <div style={{ marginBottom: "1em" }}>
        <label>
          Filter by Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            style={{ width: 200 }}
          />
        </label>
        <button onClick={fetchData}>Search</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {rows.length === 0 && (
          <li
            style={{
              background: "#fff3cd",
              border: "1px solid #ffeeba",
              borderRadius: 6,
              padding: "1em",
              textAlign: "center",
              color: "#856404",
            }}
          >
            No data for this period.
          </li>
        )}
        {rows.map((row) => (
          <li
            key={`${row.user_id}-${row.week_start}`}
            style={{
              background: "#f8f9fa",
              border: "1px solid #e2e3e5",
              borderRadius: 8,
              marginBottom: "1em",
              padding: "1em",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <h3 style={{ margin: 0, color: "#007bff", fontSize: "1.1em" }}>
              Week starting:{" "}
              {row.week_start
                ? yearWeekToDate(row.week_start).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </h3>

            <div style={{ marginTop: 8 }}>
              <span style={{ display: "block", marginBottom: 4 }}>
                <strong>User:</strong> {row.user_name || "Unknown"}
              </span>
              <span style={{ display: "block", marginBottom: 4 }}>
                <strong>Total Orders:</strong> {row.order_count}
              </span>
              <span style={{ display: "block" }}>
                <strong>Total Spend:</strong> $
                {Number(row.total_spent || 0).toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyOrders;
