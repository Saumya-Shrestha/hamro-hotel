import React from "react";

const ContactHome = ({ mode }) => {
  return (
    <>
      <div className={`${mode === "dark" ? "bg-black border-secondary" : "bg-white border-light-subtle"} border-top py-5`}>
        <div className={`container text-left d-flex justify-content-between align-items-center ${mode === "dark" ? "border-secondary" : ""}`}>
          <div>
            <h1 className={mode === "dark" ? "text-light" : "text-dark"}>Ready to Experience Luxury?</h1>
            <p className={mode === "dark" ? "text-light" : "text-dark"}>
              Whether you're planning a romantic getaway, family vacation, or business trip, <br />
              our concierge team is ready to create your perfect stay at Hamro Luxury Hotel.
            </p>
          </div>
          <div>
            <button className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-3`}>Contact Us</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactHome;
