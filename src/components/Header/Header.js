import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/Logo.jpg";
import IconsBar from "../IconsBar/IconsBar";
import "./Header.scss";
export default function Header() {
  return (
    <header className="header">
      <IconsBar />
      <Link className="header__logo" to="/">
        <img className="header__logo header__logo--img" alt="logo" src={logo} />
      </Link>
      <Navbar />
      <p className="header__hero">
        Cobourg’s fresh market for quality produce and healthy to-go meals.
      </p>
    </header>
  );
}
