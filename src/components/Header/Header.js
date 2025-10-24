import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/Logo.jpg";
import IconsBar from "../IconsBar/IconsBar";
import faceicon from "../../assets/icons/icons8-facebook-32.png";
import emailicon from "../../assets/icons/icons8-email-32.png";
import instgicon from "../../assets/icons/icons8-instagram-32.png";
import phoneicon from "../../assets/icons/icons8-phone-32.png";
import "./Header.scss";
import Cta from "../Cta/Cta";
import { token } from "../../utils/api";
export default function Header() {
  return (
    <header className="header">
      <div className="header__icons">
        <IconsBar
          faceicon={faceicon}
          // emailicon={emailicon}
          instgicon={instgicon}
          // phoneicon={phoneicon}
          facelink={"https://www.facebook.com/MarketSmor"}
          // emailink={"mailto:marketsmorproduce@gmail.com"}
          instlink={"https://www.instagram.com/marketsmor/"}
          // phonelink={"tel:+19052691614"}
        />

        <div className="header__cta">
          <Cta btnName="Cart" btnLink="/cart" />
          <>
            {token && token !== "undefined" && token !== "null" ? (
              <Cta btnName="Profile Dashboard" btnLink="/profile" />
            ) : (
              <Cta btnName="Users" btnLink="/user-landing-page" />
            )}
          </>
        </div>
      </div>

      <Link className="header__logo" to="/">
        <img className="header__logo header__logo--img" alt="logo" src={logo} />
      </Link>

      <Navbar />
    </header>
  );
}
