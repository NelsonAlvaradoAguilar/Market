import { useState } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import Profile from "../Profile/Profile";

export default function LoginForm({ setToken }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(form.email, form.password);
      const token = response.data.token;

      // Save token and notify App
      localStorage.setItem("token", token);
      setToken(token);

      // Go to profile; App will fetch user (with role) via getAuthorized
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
