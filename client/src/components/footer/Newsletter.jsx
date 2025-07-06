import React from "react";

const Newsletter = ({ mode }) => {
  return (
    <>
      <div className="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <label
              htmlFor="newsletter1"
              className="visually-hidden"
            >
              Email address
            </label>
            <input
              id="newsletter1"
              type="email"
              className="form-control"
              placeholder="Email address"
            />
            <button className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}>Signup</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Newsletter;
