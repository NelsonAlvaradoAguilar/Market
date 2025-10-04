import data from "../../data/StoreData.json";
import "./About.scss";
import FeaturedCarousel from "../Carousel/Carousel";
import grapes from "../../assets/products-images/grapes.jpg";
import multiple from "../../assets/products-images/multiple.jpg";
export default function About() {
  const { store: store } = data;
  return (
    <section className="about">
      <div className="about__banner"></div>
      <div className="about__box">
        <div>
          <h2 className="about__title">{store.about.headline}</h2>
          <p className="about__text">{store.about.intro}</p>
          <p className="about__text">{store.about.story}</p>
        </div>
        <img className="about__img" src={grapes} alt="grapes" />
      </div>

      <div className="about__box">
        <div>
          <h3 className="about__subtitle"> OUR MISSION:</h3>
          <p className="about__text">{store.about.mission}</p>
          <p className="about__text">{store.about.founder}</p>
          <p className="about__text">{store.about.press}</p>
          <p className="about__text">{store.about.closing}</p>
        </div>
        <img className="about__img" src={multiple} alt="grapes" />
      </div>
    </section>
  );
}
