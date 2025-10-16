import { useState } from "react";
import axios from "axios";
import { loginUser } from "../../utils/api";
import Profile from "../Profile/Profile";

export default function LoginForm({ onLogin }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form.email, form.password);
      setIsLoggedIn(true);
      // ...rest of your logic
    } catch (err) {
      setError(err.message);
    }
  };
  if (isLoggedIn) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            name="email" // <-- Add this!
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password" // <-- Add this!
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Log In</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </>
    );
  }
  return <Profile onLogin={onLogin} />;
}
