import React, { useState, useContext } from "react";
import b1 from "../assets/blog/blog-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import SmallBanner from "../components/common/SmallBanner";
import { AuthContext } from "../context/AuthContext";

const Signup = ({ mode }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = credential;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });
    const data = await response.json();
    console.log("Backend response: ", data);
    if (data.authToken) {
      login(data.authToken);
      navigate("/login");
    } else {
      console.log("Invalid Credentials");
    }
    console.log("Register form has been submitted");
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
    // console.log(credential);
  };
  return (
    <>
      <SmallBanner
        title="Sign Up"
        mode={mode}
      />
      <div className={`container-flex d-flex justify-content-center align-items-center login-container bg-${mode}`}>
        <div
          className="row w-100"
          style={{ maxWidth: "1200px" }}
        >
          <div className="col-md-12">
            <h2 className={`fs-2 fw-bold text-center pb-4 ${mode === "dark" ? "text-light" : "text-dark"}`}>Create an Account</h2>
          </div>
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="card border-0 w-100">
              <img
                className="card-img h-100"
                loading="lazy"
                src={b1}
                alt="Signup Image"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <form
              className={`w-100 ${mode === "dark" ? "text-light" : "text-dark"} `}
              onSubmit={handleSubmit}
              style={{ minHeight: "500px", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div className="form-outline mb-4">
                <label className={`${mode === "dark" ? "text-light" : ""}`}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={credential.name}
                  onChange={handleChange}
                  id="registerName"
                  className={`form-control ${mode === "dark" ? "dark-mode-input" : ""}`}
                />
              </div>

              <div className="form-outline mb-4">
                <label className={`${mode === "dark" ? "text-light" : ""}`}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={credential.email}
                  onChange={handleChange}
                  id="registerEmail"
                  className={`form-control ${mode === "dark" ? "dark-mode-input" : ""}`}
                />
              </div>

              <div className="form-outline mb-4">
                <label className={`${mode === "dark" ? "text-light" : ""}`}>Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credential.password}
                    onChange={handleChange}
                    id="registerPassword"
                    className={`form-control ${mode === "dark" ? "dark-mode-input" : ""}`}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </span>
                </div>
              </div>

              <div className="form-outline mb-4">
                <label className={`${mode === "dark" ? "text-light" : ""}`}>Confirm password</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={credential.confirmPassword}
                    onChange={handleChange}
                    id="registerRepeatPassword"
                    className={`form-control ${mode === "dark" ? "dark-mode-input" : ""}`}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2 mb-4`}
                >
                  Sign up
                </button>
              </div>

              <div className="text-center">
                <p>
                  Already a member?
                  <Link
                    to="/login"
                    className={`${mode === "light" ? "light-accent-text" : "dark-accent-text"} px-1`}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
