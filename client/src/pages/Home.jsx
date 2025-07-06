import React from "react";
import Banner from "../components/home/Banner";
import ServiceHome from "../components/home/ServiceHome";
import Room from "../components/home/Room";
import Testimonial from "../components/home/Testimonial";
import Gallery from "../components/home/Gallery";
import AboutHome from "../components/home/AboutHome";
import ContactHome from "../components/home/ContactHome";

const Home = ({ mode }) => {
  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <Banner mode={mode} />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <AboutHome mode={mode} />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <ServiceHome mode={mode} />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="450"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <Room mode={mode} />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <Testimonial mode={mode} />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="750"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <Gallery mode={mode} />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="900"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <ContactHome mode={mode} />
      </div>
    </div>
  );
};

export default Home;
