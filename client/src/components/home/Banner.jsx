import React from "react";
import b1 from "../../assets/hero/hero-1.jpg";
import b2 from "../../assets/hero/hero-2.jpg";
import b3 from "../../assets/hero/hero-3.jpg";

const Banner = ({ mode }) => {
  return (
    <>
      <div className="banner-wrapper position-relative hero">
        <div
          id="carouselExampleCaptions"
          className="carousel slide hero-section"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={b1}
                className="d-block w-100"
                alt="Hotel view"
              />
            </div>
            <div className="carousel-item">
              <img
                src={b2}
                className="d-block w-100"
                alt="Hotel view"
              />
            </div>
            <div className="carousel-item">
              <img
                src={b3}
                className="d-block w-100"
                alt="Hotel view"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <section className="position-absolute top-0 start-0 w-100 h-100">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-6">
                <div className="hero-text">
                  <h1>Hamro Luxury Hotel</h1>
                  <p>Our award-winning accommodations blend traditional elegance with modern comfort for an unforgettable stay.</p>
                  <div className="hero-button">
                    <a
                      href="#"
                      className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-3`}
                    >
                      Discover Now
                    </a>
                  </div>
                </div>
              </div>
              <div className={`col-lg-5 offset-lg-1`}>
                <div className={`booking-form ${mode === "dark" ? "dark-booking-form" : ""}`}>
                  <h3 className="text-center">Booking Your Hotel</h3>
                  <form action="#">
                    <div className="check-date">
                      <label htmlFor="date-in">Check In:</label>
                      <input
                        type="text"
                        className={`date-input ${mode === "dark" ? "dark-mode-input" : ""}`}
                        id="date-in"
                      />
                      <i className="fa-solid fa-calendar"></i>
                    </div>
                    <div className="check-date">
                      <label htmlFor="date-out">Check Out:</label>
                      <input
                        type="text"
                        className={`date-input ${mode === "dark" ? "dark-mode-input" : ""}`}
                        id="date-out"
                      />
                      <i className="fa-solid fa-calendar"></i>
                    </div>
                    <div className="select-option">
                      <label htmlFor="guest">Guests:</label>
                      <select
                        id="guest"
                        className={mode === "dark" ? "dark-mode-input" : ""}
                      >
                        <option value="">2 Adults</option>
                        <option value="">3 Adults</option>
                      </select>
                    </div>
                    <div className="select-option">
                      <label htmlFor="room">Room:</label>
                      <select
                        id="room"
                        className={mode === "dark" ? "dark-mode-input" : ""}
                      >
                        <option value="">1 Room</option>
                        <option value="">2 Room</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className={`${mode === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
                    >
                      Check Availability
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Banner;
