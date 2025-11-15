import { Link } from "react-router-dom";
import "./Navbar.scss";
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link className="navbar__link" to="/home">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/about">
            About Us
          </Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/shoppage">
            Shop Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}
/**        <li className="navbar__item">
          <Link className="navbar__cart" to="/cart">
            Cart
          </Link>
        </li> */
