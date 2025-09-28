// src/components/ContactForm.js

import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "your_service_id";
const TEMPLATE_ID = "your_template_id";
const PUBLIC_KEY = "your_public_key";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
      })
      .catch(() => {
        setError("Failed to send message. Please try again later.");
      });
  }

  if (submitted) {
    return (
      <p style={{ color: "green", marginTop: "1rem" }}>
        Thank you! Your message has been sent.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="message">Message</label>
        <br />
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
        />
      </div>
      {error && <p>{error}</p>}
      <button
        type="submit"
        style={{
          padding: "0.75rem 2rem",
          background: "#00796b",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold",
        }}
      >
        Send Message
      </button>
    </form>
  );
}
