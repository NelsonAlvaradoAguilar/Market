import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Embed from "../../components/Embed/Embed";
import storeData from "../../data/StoreData.json";
import BusinessHours from "../../components/BusinessHours/BusinesHours";
import "./Home.scss";
import NewsletterSignup from "../../components/Newsletter/Newsletter";
import FeaturedCarousel from "../../components/Carousel/Carousel";
import { images } from "../../data/images";
import Hero2 from "../../components/Hero2/Hero2";
export default function Home() {
  return (
    <section className="home">
      <>
        <Hero2 />
        <div className="home__banner">
          <h4 className="home__title">Weekly Sales $$$$</h4>
        </div>

        <FeaturedCarousel items={images} />

        <NewsletterSignup />
        <Hero />
        <Embed url={"home__about"} />
        <section className="home__info">
          <h3 className="home__subtitle">Location</h3>
          <Embed
            url={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.964157995808!2d-78.16640992380694!3d43.96010697108918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d5c502ff790587%3A0xc98b2cd477f37a00!2sThe%20Market%20%26%20Sm%C3%B8r!5e0!3m2!1ses!2sca!4v1758944147055!5m2!1ses!2sca"
            }
          />
          <p className="home__paragrph">123 Main St, Cobourg, ON</p>
        </section>
      </>
    </section>
  );
}
