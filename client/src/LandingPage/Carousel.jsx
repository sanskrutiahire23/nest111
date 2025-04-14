import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import cloud from '../LandingPage/Cloud_Storage.jpg'
import file from '../LandingPage/data.avif'
import hand from '../LandingPage/any.jpg'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Auto transition every 4 seconds
    pauseOnHover: true,
    arrows: true, // Enable navigation arrows
  };

  const services = [
    {
      image:cloud, // Replace with your image URL
      title: 'Secure Storage',
      description: "Experience peace of mind with PixelVault's secure storage. Your photos and files are safeguarded with advanced encryption, ensuring they remain private and protected. ",
    },
    {
      image:file, // Replace with your image URL
      title: 'Effortless Organization',
      description: 'Our intuitive platform allows you to categorize, tag, and sort your photos and files with ease, ensuring that everything you need is just a click away. ',
    },
    {
      image: hand, // Replace with your image URL
      title: 'Access Anywhere',
      description: " Whether you're at home, traveling, or on the go, your photos are just a click away. With seamless cloud integration, you can view, share, and manage your cherished moments anytime, from any device, anywhere in the world.",
    },
  ];

  return (
    <div className="services-section" id='services'>
      <h2 className="services-title">Services</h2>
      <div className="carousel-container">
        <Slider {...settings}>
          {services.map((service, index) => (
            <div className="carousel-slide" key={index}>
              <div className="slide-content">
                <img src={service.image} alt={service.title} className="slide-image" />
                <div className="slide-info">
                  <h3 className="slide-title">{service.title}</h3>
                  <p className="slide-description">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
