import React from "react";
import b1 from "../assets/blog/blog-1.jpg";
import b2 from "../assets/blog/blog-2.jpg";
import SmallBanner from "../components/common/SmallBanner";
import AboutCard from "../components/cards/AboutCard";

const About = ({ mode }) => {
  return (
    <div className={`bg-${mode} text-${mode === "light" ? "dark" : "light"}`}>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <SmallBanner
          title="About Us"
          mode={mode}
        />
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1200"
              data-aos-easing="ease-out-cubic"
            >
              <h2 className="display-5 mb-4">Our journey began with a passion for creating extraordinary hospitality experiences.</h2>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1200"
              data-aos-easing="ease-out-cubic"
            >
              <button
                type="button"
                className={`btn ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-3 mb-4`}
              >
                Discover More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="row pb-5"
          data-aos="fade-up"
          data-aos-delay="450"
          data-aos-duration="1200"
          data-aos-easing="ease-out-cubic"
        >
          <AboutCard
            title="Our Vision"
            text="From elegant suites to immersive dining experiences, we infuse every moment with a touch of luxury and care. We believe that exceptional hospitality can create unforgettable memories and build connections that last a lifetime."
            mode={mode}
            image={b1}
          />
          <AboutCard
            title="Our Mission"
            text="We strive to exceed expectations through personalized service and attention to detail. Our dedicated team works tirelessly to ensure that every guest experiences the perfect blend of comfort, luxury, and authentic local culture."
            mode={mode}
            image={b2}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
