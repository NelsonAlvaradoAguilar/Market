import { useState } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import Profile from "../Profile/Profile";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form.email, form.password);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => navigate("/profile"), 20);
      setLoggingIn(true);
    } catch (err) {
      setError(err.message);
    }
  };
  if (!loggingIn) {
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
        <button type="submit">Log In</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    );
  } else {
    return <ProfilePage userInfo={form} onLogout={() => setLoggingIn(false)} />;
  }
}
