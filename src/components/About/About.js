import data from "../../data/StoreData.json";
import "./About.scss";
import FeaturedCarousel from "../Carousel/Carousel";
export default function About() {
  const { store: store } = data;
  return (
    <section className="about">
      <h2 className="about__title">{store.about.headline}</h2>
      <p className="about__text">{store.about.intro}</p>
      <p className="about__text">{store.about.story}</p>

      <h3 className="about__subtitle"> OUR MISSION:</h3>
      <p className="about__text">{store.about.mission}</p>
      <p className="about__text">{store.about.founder}</p>
      <p className="about__text">{store.about.press}</p>
      <p className="about__text">{store.about.closing}</p>
    </section>
  );
}
