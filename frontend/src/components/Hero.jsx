import React from "react";
import { Carousel } from "@material-tailwind/react";
import img1 from "../assets/heros images/1.png";
import img2 from "../assets/heros images/2.png";
import img3 from "../assets/heros images/3.png";
import img4 from "../assets/heros images/4.png";
import img5 from "../assets/heros images/5.png";

const Hero = () => {
  const arr = [img1, img2, img3, img4, img5];

  return (
    <div>
      <Carousel className="" autoplay={true} autoplayDelay={3000} loop={true}>
        {arr.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="h-64 w-full object-cover sm:h-72 md:h-96  "
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
