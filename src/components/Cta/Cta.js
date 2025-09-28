import { Link } from "react-router-dom";
import "./Cta.scss";
const Cta = function ({ btnName, btnLink }) {
  return (
    <>
      <Link className="cta" to={btnLink}>
        {btnName}
      </Link>
    </>
  );
};
export default Cta;
