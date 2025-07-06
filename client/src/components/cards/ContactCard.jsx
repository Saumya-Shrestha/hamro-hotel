import React from "react";

const ContactCard = ({ mode, icon, text }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <span
          className={`mb-3 ${mode === "light" ? "light-accent-button" : "dark-accent-button"} ${
            mode === "light" ? "light-accent-icon" : "dark-accent-icon"
          } contact-card`}
        >
          <i className={`fa-solid fa-${icon} me-2`}></i>
          <span>{text}</span>
        </span>
      </div>
    </>
  );
};

export default ContactCard;
