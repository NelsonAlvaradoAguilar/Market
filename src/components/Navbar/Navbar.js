import { Link } from "react-router-dom";
import "./Navbar.scss";
export default function Navbar({ user, onLogout }) {
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
            Box
          </Link>
        </li>
        <li className="navbar__item">
          {" "}
          {user?.role === "admin" && (
            <Link className="navbar__link" to="/admin">
              Admin
            </Link>
          )}
          {user?.role === "user" && (
            <Link className="navbar__link" to="/profile">
              Profile
            </Link>
          )}
        </li>
        <li className="navbar__item">
          {!user ? (
            <Link
              className="navbar__link"
              to="/landing
            "
            >
              User Dasboard
            </Link>
          ) : null}{" "}
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
