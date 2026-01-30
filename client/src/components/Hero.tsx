import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <Carousel
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      autoPlay
      infiniteLoop
    >
      <div className="rounded-md overflow-hidden">
        <img src="/carousel1.png" />
      </div>
      <div className="rounded-md overflow-hidden">
        <img src="/carousel2.png" />
      </div>
      <div className="rounded-md overflow-hidden">
        <img src="/carousel3.png" />
      </div>
    </Carousel>
  );
};

export default Hero;
