import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Newsletter.scss";
const NewsletterSignup = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        form.current,
        "YOUR_USER_ID" // Replace with your EmailJS user/public key
      )
      .then(
        (result) => {
          setStatus("Thank you for subscribing!");
          form.current.reset();
        },
        (error) => {
          setStatus("Oops! Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="newsletter">
      <h2>Subscribe to Our Newsletter</h2>
      <form className="newsletter__form" ref={form} onSubmit={sendEmail}>
        <label>
          First Name: <br />
          <input
            className="newsletter__input"
            type="text"
            name="first_name"
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <br />
          <input
            className="newsletter__input"
            type="text"
            name="last_name"
            required
          />
        </label>
        <br />
        <label>
          Email: <br />
          <input
            className="newsletter__input"
            type="email"
            name="user_email"
            required
          />
        </label>
        <br />
        <label>
          Phone Number: <br />
          <input
            className="newsletter__input"
            type="tel"
            name="phone"
            required
          />
        </label>
        <br /> <br />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default NewsletterSignup;
