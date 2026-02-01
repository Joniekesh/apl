import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div className="rounded-md overflow-hidden">
      <Carousel
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        autoPlay
        infiniteLoop
      >
        {/* <div>
          <img src="/carousel4.png" className="object-cover w-full h-full" />
        </div> */}
        <div>
          <img src="/carousel2.png" className="object-cover w-full h-full" />
        </div>
        <div>
          <img src="/carousel3.png" className="object-cover w-full h-full" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
