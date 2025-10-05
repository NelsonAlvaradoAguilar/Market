import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carousel.scss";

export default function FeaturedCarousel({ items }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // No arrows
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 2500, // Slide every 2.5 seconds (adjust as needed)
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.name} className="carousel__card">
            <img
              className="carousel__img"
              src={item.imageUrl}
              alt={item.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
