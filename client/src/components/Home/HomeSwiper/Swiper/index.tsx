import Slider from "react-slick";

import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./styles.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: 15, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: 15, zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function Swiper() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    fade: true,
  };
  return (
    <div className="slider-container w-full h-full">
      <Slider {...settings} className="w-full h-full">
        <div className="w-full h-full !flex items-center justify-center bg-red-500">
          <Image
            src="/assets/images/home-swiper-01.jpeg"
            alt="banner"
            width={1920}
            height={1080}
          />
        </div>
        <div className="w-full h-full !flex items-center justify-center bg-blue-500">
          <Image
            src="/assets/images/home-swiper-02.png"
            alt="banner"
            width={1920}
            height={1080}
          />
        </div>
        <div className="w-full h-full !flex items-center justify-center bg-green-500">
          <Image
            src="/assets/images/home-swiper-03.webp"
            alt="banner"
            width={1920}
            height={1080}
          />
        </div>
      </Slider>
    </div>
  );
}

export default Swiper;
