import { useState } from "react";
import axios from "axios";
import { signUp } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // If signUp expects (name, email, password):
      const res = await signUp(form.name, form.email, form.password);
      // If signUp expects ({ name, email, password }): use await signUp(form);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      onRegister && onRegister(res.user);
      navigate("/profile");
    } catch (err) {
      setError("Registration failed: " + (err.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
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
      <button type="submit">Sign Up</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
