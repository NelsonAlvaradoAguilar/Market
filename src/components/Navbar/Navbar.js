import { Link } from "react-router-dom";
import "./Navbar.scss";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navbar__link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="navbar__link" to="/shoppage">
            Shop Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}
