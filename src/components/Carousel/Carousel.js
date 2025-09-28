import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import data from "../../data/ProductsData.json";
import "./Carousel.scss";
export default function FeaturedCarousel() {
  // Example: show featured products
  const featuredItems = data.products.filter((item) => item.featured);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // adjust for your design
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {featuredItems.map((item) => (
          <div key={item.name} className="carousel-card">
            <img src={item.imageUrl} alt={item.name} width={180} />
            <h3>{item.name}</h3>
            <p>
              {item.brand} | {item.origin}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
