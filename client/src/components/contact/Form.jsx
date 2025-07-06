import React from "react";

const Form = ({ mode }) => {
  return (
    <>
      <form className={`p-4 border rounded ${mode === "dark" ? "bg-dark border-secondary" : "bg-light"}`}>
        <p className={`${mode === "dark" ? "text-light dark-mode-input" : ""}`}>
          Please fill out the form below with your query or message. We strive to respond to all inquiries within 24 hours or before.
        </p>
        <div className="mb-3 row">
          <label
            htmlFor="nameInput"
            className="col-sm-3 col-form-label"
          >
            Your Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
              id="nameInput"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="emailInput"
            className="col-sm-3 col-form-label"
          >
            Your Email Address
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
              id="emailInput"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="subjectInput"
            className="col-sm-3 col-form-label"
          >
            What's This About?
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
              id="subjectInput"
              placeholder="Enter a subject"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="messageInput"
            className="col-sm-3 col-form-label"
          >
            Message Box
          </label>
          <div className="col-sm-9">
            <textarea
              className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
              id="subjectInput"
              rows="4"
              placeholder="Please type your message here"
            ></textarea>
          </div>
        </div>

        <div className="col-12 text-end">
          <button
            type="submit"
            className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}
          >
            Send Now
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
