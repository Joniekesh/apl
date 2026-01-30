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
      <div className="h-[20vh] md:h-auto rounded-md overflow-hidden">
        <img
          src="/carousel1.png"
          className="h-full w-full object-cover md:h-auto md:object-contain"
        />
      </div>
      <div className="h-[20vh] md:h-auto rounded-md overflow-hidden">
        <img
          src="/carousel2.png"
          className="h-full w-full object-cover md:h-auto md:object-contain"
        />
      </div>
      <div className="h-[20vh] md:h-auto rounded-md overflow-hidden">
        <img
          src="/carousel3.png"
          className="h-full w-full object-cover md:h-auto md:object-contain"
        />
      </div>
    </Carousel>
  );
};

export default Hero;
