import React from "react";

const AboutCard = ({ mode, image, title, text }) => {
  return (
    <div className={`col-md-6 card border-0 ${mode === "dark" ? "bg-dark" : "bg-light"}`}>
      <img
        className="card-img-top"
        loading="lazy"
        src={image}
        alt={title}
      />
      <div className={`card-body border border-top-0 p-4 ${mode === "dark" ? "border-black" : ""}`}>
        <h2 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}>{title}</h2>
        <p className={`card-text mb-3 text-${mode === "light" ? "dark" : "light"}`}>{text}</p>
      </div>
    </div>
  );
};

export default AboutCard;
