import Cta from "../Cta/Cta";
import "./Hero.scss";
import { image2, image3 } from "../../data/images";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__box">
        <img className="hero__img" src={image2} />{" "}
        <p className="hero__text">
          {" "}
          Cobourg’s fresh market for quality produce and healthy to-go meals.
        </p>
      </div>
      <div className="hero__box">
        <p className="hero__text">Fresh and sustainable products</p>{" "}
        <img className="hero__img" src={image3} />
      </div>
    </div>
  );
}
// <Cta btnName="Shop Now" btnLink="/products" />
