import IconsBar from "../IconsBar/IconsBar";
import "./Footer.scss";
import phoneicon from "../../assets/icons/icons8-phone-32.png";
import emailicon from "../../assets/icons/icons8-email-32.png";
import BusinessHours from "../BusinessHours/BusinesHours";
import storeData from "../../data/StoreData.json";
import { Link } from "react-router-dom";
export default function Footer(user) {
  const workingHours = storeData?.store?.workingHours?.workingHours || [];
  return (
    <footer className="footer">
      <BusinessHours workingHours={workingHours} />
      <div className="footer__icons">
        <div className="footer__links">&copy; {new Date().getFullYear()}</div>
        <IconsBar
          phonelink={"tel:+19052691614"}
          phoneicon={phoneicon}
          emailink={"mailto:marketsmorproduce@gmail.com"}
          emailicon={emailicon}
        />
        {user ? <Link className="footer__cta-user" to="/"></Link> : null}
      </div>
    </footer>
  );
}
// The Markets Smor. All rights reserved.
