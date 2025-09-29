import faceicon from "../../assets/icons/icons8-facebook-32.png";
import emailicon from "../../assets/icons/icons8-email-32.png";
import instgicon from "../../assets/icons/icons8-instagram-32.png";
import phoneicon from "../../assets/icons/icons8-phone-32.png";
import "./IconsBar.scss";
function IconsBar(params) {
  return (
    <div className="icons">
      <a
        href="https://www.facebook.com/MarketSmor"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={faceicon} alt="Facebook" />
      </a>
      <a href="mailto:marketsmorproduce@gmail.com">
        <img src={emailicon} alt="Email" />
      </a>
      <a
        href="https://www.instagram.com/marketsmor/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={instgicon} alt="Instagram" />
      </a>
      <a href="tel:+19052691614">
        <img src={phoneicon} alt="Call us" />
      </a>
    </div>
  );
}
export default IconsBar;
