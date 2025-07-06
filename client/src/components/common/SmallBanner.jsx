import React from "react";
import bg from "../../assets/bg.jpg";

const SmallBanner = ({ title }) => {
  return (
    <div className="banner-container">
      <img
        className="small-banner"
        src={bg}
        alt="Banner Image"
        height={300}
      />
      <h4 className="title fs-1 fw-bold">{title}</h4>
    </div>
  );
};

export default SmallBanner;
