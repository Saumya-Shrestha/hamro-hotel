import React from "react";

const FooterColumn = ({ title, customLinks }) => {
  const defaultLinks = [
    { text: "Our Rooms", url: "#rooms" },
    { text: "Amenities", url: "#amenities" },
    { text: "Dining", url: "#dining" },
    { text: "Spa & Wellness", url: "#spa" },
    { text: "Special Offers", url: "#offers" },
  ];

  const links = customLinks || defaultLinks;
  const sectionTitle = title || "Accommodations";

  return (
    <>
      <div className="col-md-2 mb-3">
        <h5 className="text-light">{sectionTitle}</h5>
        <ul className="nav flex-column">
          {links.map((link, index) => (
            <li
              className="nav-item mb-2"
              key={index}
            >
              <a
                href={link.url}
                className="nav-link p-0 text-light"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterColumn;
