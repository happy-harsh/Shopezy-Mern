import React from "react";
import img1 from "../assets/Category Icons/1.png";
import img2 from "../assets/Category Icons/2.png";
import img3 from "../assets/Category Icons/3.png";
import img4 from "../assets/Category Icons/4.png";
import img5 from "../assets/Category Icons/5.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryIcon = () => {
  const imageTextArray = [
    { image: img1, text: "Fashion", link: "/fashion" },
    { image: img2, text: "Beauty", link: "/beauty" },
    { image: img3, text: "Electronics", link: "/electronics" },
    { image: img4, text: "Medicine", link: "/medicine" },
    { image: img5, text: "Household", link: "/household" },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Number of images to show in the slider
    slidesToScroll: 1,
    arrows:false,
    responsive: [
      {
        breakpoint: 768, // Adjust settings for smaller screens
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="text-white py-4" style={{ backgroundColor: "#0c5273" }}>
      <div className="container mx-auto sm:mx-10px">
        <Slider {...settings}>
          {imageTextArray.map((item, index) => (
            <div key={index} className="w-32 p-4 text-center">
              <Link to={item.link}>
                <img
                  src={item.image}
                  alt={`Image ${index + 1}`}
                  className="w-24 sm:w-32 h-24 sm:h-32 mx-auto" // Set different sizes for small screens (sm)
                />
              </Link>
              <p className="mt-2">
                <Link to={item.link} className="text-white">
                  {item.text}
                </Link>
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryIcon;
