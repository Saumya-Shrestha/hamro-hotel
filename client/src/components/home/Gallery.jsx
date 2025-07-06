import React from "react";
import b1 from "../../assets/blog/blog-1.jpg";
import b2 from "../../assets/blog/blog-2.jpg";
import b3 from "../../assets/blog/blog-3.jpg";
import b4 from "../../assets/blog/blog-wide.jpg";
import b5 from "../../assets/blog/blog-4.jpg";

const Gallery = ({ mode }) => {
  const galleryItems = [
    {
      id: 1,
      image: b1,
      alt: "Luxury hotel suite with city view",
      size: "regular",
    },
    {
      id: 2,
      image: b2,
      alt: "Hotel swimming pool with cabanas",
      size: "regular",
    },
    {
      id: 3,
      image: b3,
      alt: "Elegant hotel restaurant interior",
      size: "regular",
    },
    {
      id: 4,
      image: b4,
      alt: "Panoramic view of hotel exterior",
      size: "wide",
    },
    {
      id: 5,
      image: b5,
      alt: "Hotel spa treatment room",
      size: "regular",
    },
  ];

  return (
    <>
      <div className={`bg-${mode === "dark" ? "black" : "white"} bg-gradient py-5`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2 className={`text-center mb-4 fs-1 fw-bold ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}>Hotel Gallery</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className={`col-lg-${item.size === "wide" ? "8" : "4"}`}
              >
                <div className={`blog-item ${item.id === 1 ? "mb-4" : ""} ${mode === "dark" ? "dark-gallery-item" : ""}`}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
