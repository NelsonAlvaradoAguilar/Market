import Cta from "../Cta/Cta";
import "./Hero.scss";

export default function Hero() {
  return (
    <div className="hero">
      <h1 className="hero__title">Welcome to The Markets Smor</h1>
      <p className="hero__description">
        Discover fresh local goods, unique finds, and community favorites—all in
        one friendly neighborhood market. Visit us in person to experience what
        makes The Markets Mor special.
      </p>
      <div className="hero__cta">
        <Cta btnName="Shop Now" btnLink="/products" />
      </div>
    </div>
  );
}
