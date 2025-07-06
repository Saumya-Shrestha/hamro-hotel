import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ mode, text, toggleMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const context = useContext(ProductContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const {
    state: { cart },
  } = context;

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      navigate("/");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header-section bg-${mode} text-${mode === "light" ? "dark" : "light"}`}>
      <div className="top-nav">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="tn-left">
                <li>
                  <i className={`fa fa-phone ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}></i> (+977) 1 2345678
                </li>
                <li>
                  <i className={`fa fa-envelope ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}></i> reservations@hamrohotel.com
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="tn-right">
                {isLoggedIn && (
                  <Link to="/profile">
                    <button
                      className={`mx-3 bg-transparent border-0 ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}
                      style={{ cursor: "pointer" }}
                    >
                      <FaUser />
                    </button>
                  </Link>
                )}

                <Link to="/cartitems">
                  <button
                    className={`mx-2 bg-transparent border-0 ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} position-relative`}
                    style={{ cursor: "pointer" }}
                  >
                    <FaShoppingCart />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.length}
                      <span className="visually-hidden">cart details</span>
                    </span>
                  </button>
                </Link>

                <button
                  className={`mx-4 bg-transparent border-0 ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}
                  onClick={toggleMode}
                  style={{ cursor: "pointer" }}
                >
                  {text}
                </button>

                <button
                  className={`${mode === "light" ? "light-accent-button" : "dark-accent-button"} bk-btn`}
                  onClick={handleAuthClick}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-item">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="logo">
                <Link to="/">
                  <img
                    src={logo}
                    alt="HAMRO HOTEL"
                    style={{ height: "32px" }}
                    className="mt-2"
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-10">
              <div className="nav-menu text-end">
                <nav className={`mainmenu mainmenu-${mode}`}>
                  <ul className={`header-content ${isMenuOpen ? "active" : ""}`}>
                    <li>
                      <Link
                        to="/"
                        onClick={closeMenu}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        onClick={closeMenu}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog"
                        onClick={closeMenu}
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        onClick={closeMenu}
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/allproducts"
                        onClick={closeMenu}
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <form
                        onSubmit={handleSearchSubmit}
                        className="d-flex ms-4"
                      >
                        <input
                          className="form-control me-2"
                          type="search"
                          name="searchQuery"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search"
                        />
                      </form>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`hamburger d-block d-md-none ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Navbar;
