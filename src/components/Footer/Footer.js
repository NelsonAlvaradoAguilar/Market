import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        &copy; {new Date().getFullYear()} The Markets Smor. All rights reserved.
      </div>
    </footer>
  );
}
