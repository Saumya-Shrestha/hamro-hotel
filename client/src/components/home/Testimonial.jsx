import React from "react";
import { Carousel } from "react-bootstrap";

const Testimonial = ({ mode }) => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Kate",
      text: "Our stay at Hamro Luxury Hotel exceeded all expectations. The staff anticipated our every need, and the suite offered breathtaking views of the city. The on-site restaurant serves exceptional cuisine, and the spa treatments were truly rejuvenating.",
      rating: 5,
    },
    {
      id: 2,
      name: "John Doe",
      text: "Our stay at Hamro Luxury Hotel exceeded all expectations. The staff anticipated our every need, and the suite offered breathtaking views of the city. The on-site restaurant serves exceptional cuisine, and the spa treatments were truly rejuvenating.",
      rating: 4,
    },
    {
      id: 3,
      name: "James & Emily Wilson",
      text: "Our stay at Hamro Luxury Hotel exceeded all expectations. The staff anticipated our every need, and the suite offered breathtaking views of the city. The on-site restaurant serves exceptional cuisine, and the spa treatments were truly rejuvenating.",
      rating: 5,
    },
  ];

  return (
    <>
      <div className={`testimonial bg-${mode} pt-5`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="my-4">
                <h1 className={`text-center pt-4 fs-1 fw-bold ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}>Testimonials</h1>
                <h2 className={`text-center fs-5 pt-2 ${mode === "dark" ? "text-light" : "text-body"}`}>What People Say About Us?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Carousel
                id="carouselExampleControls"
                interval={5000}
                indicators={false}
                prevIcon={<span className={`carousel-control-prev-icon ${mode === "dark" ? "text-light" : "text-body"}`} />}
                nextIcon={<span className={`carousel-control-next-icon ${mode === "dark" ? "text-light" : "text-body"}`} />}
              >
                {testimonials.map((testimonial) => (
                  <Carousel.Item
                    key={testimonial.id}
                    className={`ts-item ${mode === "dark" ? "dark-ts-item" : ""}`}
                  >
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-10">
                        <p>{testimonial.text}</p>
                        <div className="ti-author">
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fa${testimonial.rating > i ? "s" : "r"} fa-star`}
                              ></i>
                            ))}
                          </div>
                          <h5 className="ms-2"> - {testimonial.name}</h5>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
