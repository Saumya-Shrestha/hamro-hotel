import React from "react";
import b1 from "../../assets/about/about-2.jpg";
import b2 from "../../assets/about/about-1.jpg";

const AboutHome = ({ mode }) => {
  return (
    <>
      <div className={`${mode === "dark" ? "bg-dark border-secondary" : "bg-light border-light-subtle"} border-bottom pt-5`}>
        <h2 className={`mb-4 pt-4 ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} text-center fs-1 fw-bold`}>About Us</h2>
        <div className="container px-4 pb-5">
          <div className="row flex-lg-row-reverse align-items-center py-5">
            <div className="col-md-3 about-image">
              <img
                src={b1}
                height={400}
                width={250}
                style={{ objectFit: "fill" }}
                alt="Bootstrap Themes"
                loading="lazy"
              />
            </div>
            <div className="col-md-3 ps-5 about-image">
              <img
                src={b2}
                height={400}
                width={250}
                style={{ objectFit: "fill" }}
                alt="Bootstrap Themes"
                loading="lazy"
              />
            </div>
            <div className="col-md-6">
              <h1 className={`display-5 fw-bold lh-1 mb-3 text-${mode === "light" ? "dark" : "light"} home-about-title`}>Hamro Luxury Hotel</h1>
              <p className={`lead mb-4 text-${mode === "light" ? "dark" : "light"} home-about-text`}>
                Nestled in the heart of the city, Hamro Luxury Hotel offers an unrivaled blend of elegance, comfort, and exceptional service. Our
                meticulously designed spaces and world-class amenities create a sanctuary for travelers seeking both relaxation and adventure.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                  type="button"
                  className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-3`}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHome;
