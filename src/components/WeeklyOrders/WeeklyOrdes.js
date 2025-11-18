import React, { useEffect, useState } from "react";
import { getWeeklyOrders } from "../../utils/api";

const WeeklyOrders = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: last 4 weeks
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 28);

      const startStr = start.toISOString().slice(0, 10);
      const endStr = end.toISOString().slice(0, 10);

      const data = await getWeeklyOrders(startStr, endStr);
      setRows(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading weekly orders...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Week Starting</th>
          <th>User</th>
          <th>Order Count</th>
          <th>Total Spent</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={`${row.user_id}-${row.week_start}`}>
            <td>{row.week_start}</td>
            <td>{row.name}</td>
            <td>{row.order_count}</td>
            <td>${Number(row.total_spent).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeeklyOrders;
