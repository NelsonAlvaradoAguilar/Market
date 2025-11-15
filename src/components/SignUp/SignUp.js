import { useState } from "react";
import { signUp } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ onRegister, setToken }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error: apiError } = await signUp(
      form.name,
      form.email,
      form.password
    );

    if (apiError) {
      setError("Registration failed: " + apiError);
      return;
    }

    if (!data.token) {
      setError("No token received from server.");
      return;
    }

    // Store token and user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Tell App that token changed so it can fetch profile
    if (setToken) setToken(data.token);

    window.dispatchEvent(new Event("tokenChange"));

    onRegister && onRegister(data.user);

    // Navigate to profile
    navigate("/profile");
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
