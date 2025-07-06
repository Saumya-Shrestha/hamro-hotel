import React from "react";

const Copyright = () => {
  return (
    <>
      <div className="copyright-section">
        <div className={`container d-flex justify-content-between align-items-center pt-3`}>
          <p className="text-light">© 2025 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="link-light"
                href="#"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="link-light"
                href="#"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Copyright;
