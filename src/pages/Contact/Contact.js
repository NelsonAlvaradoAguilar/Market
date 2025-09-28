import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.scss";
export default function Contact() {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <ContactForm />
      <p>Business info: 123 Main St, Cobourg, ON. Phone: (555) 123-4567</p>
    </section>
  );
}
