import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";

import MapEmbed from "../../components/Embed/Embed";
import storeData from "../../data/StoreData.json";
import BusinessHours from "../../components/BusinessHours/BusinesHours";
import "./Home.scss";
import NewsletterSignup from "../../components/Newsletter/Newsletter";
import FeaturedCarousel from "../../components/Carousel/Carousel";
import { images } from "../../data/images";
import Hero2 from "../../components/Hero2/Hero2";
import SignUpForm from "../../components/SignUp/SignUp";
import Cta from "../../components/Cta/Cta";
import { token } from "../../utils/api";
import { use, useEffect } from "react";
export default function Home() {
  return (
    <section className="home">
      <>
        <Hero2 />
        <div className="home__banner">
          <h4 className="home__title">Weekly Sales $$$$</h4>
        </div>

        <FeaturedCarousel items={images} />

        <Hero />
      </>
    </section>
  );
}
//        <Embed url={"home__about"} />
