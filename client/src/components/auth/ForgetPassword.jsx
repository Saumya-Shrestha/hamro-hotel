import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/forgot-password", { email }, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-0"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
