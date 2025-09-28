import data from "../../data/ProductsData.json";
import "./About.scss";
import FeaturedCarousel from "../Carousel/Carousel";
export default function About() {
  const { about } = data;
  return (
    <section className="about">
      <h2 className="about__title">{about.headline}</h2>
      <p className="about__text">{about.intro}</p>
      <p className="about__text">{about.story}</p>

      <h3 className="about__subtitle"> OUR MISSION:</h3>
      <p className="about__text">{about.mission}</p>
      <p className="about__text">{about.founder}</p>
      <p className="about__text">{about.press}</p>
      <p className="about__text">{about.closing}</p>
    </section>
  );
}
