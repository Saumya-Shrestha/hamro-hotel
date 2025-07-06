import React from "react";

const ServiceHome = ({ mode }) => {
  const services = [
    {
      icon: "square-parking",
      title: "Travel Plan",
      description: "Let our experienced concierge team arrange personalized itineraries to help you discover the best attractions.",
    },
    {
      icon: "bowl-food",
      title: "Catering Service",
      description: "From intimate celebrations to grand banquets, our catering team creates memorable culinary experiences.",
    },
    {
      icon: "bed",
      title: "Babysitting",
      description: "Enjoy peace of mind with our professional childcare services. Our certified staff provides attentive supervision for children.",
    },
    {
      icon: "shirt",
      title: "Laundry",
      description: "Our premium laundry service ensures your garments receive the utmost care with express service available.",
    },
    {
      icon: "car",
      title: "Hire Driver",
      description:
        "Explore the city in comfort with our professional chauffeurs which offers seamless transportation in luxury vehicles available 24/7.",
    },
    {
      icon: "wine-glass",
      title: "Bar & Drink",
      description: "Unwind at our elegant bar featuring craft cocktails, premium spirits, and an extensive wine selection.",
    },
  ];

  return (
    <>
      <div className={`bg-${mode} pt-5`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 className={`text-center mb-4 pt-4 fs-1 fw-bold ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}>
                  Discover Our Services
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {services.map((service, index) => (
              <div
                className="col-lg-4"
                key={index}
              >
                <div className={`service-item ${mode === "dark" ? "dark-service" : ""}`}>
                  <i className={`fa-solid fa-${service.icon}`}></i>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceHome;
