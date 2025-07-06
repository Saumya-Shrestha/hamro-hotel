import React, { useState } from "react";

const EditProductModal = ({ product, onClose, onSave, mode }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    instock: product.instock,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal open"
        id="exampleModal"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className={`modal-content ${mode === "dark" ? "bg-dark text-light border-secondary" : ""}`}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button
                className="btn-close"
                onClick={onClose}
                style={mode === "dark" ? { filter: "invert(1)" } : {}}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className={`form-label ${mode === "dark" ? "text-light" : ""}`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary" : ""}`}
                    onChange={handleChange}
                    name="title"
                    value={formData.title}
                    id="title"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className={`form-label ${mode === "dark" ? "text-light" : ""}`}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary" : ""}`}
                    onChange={handleChange}
                    name="description"
                    value={formData.description}
                    id="description"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="price"
                    className={`form-label ${mode === "dark" ? "text-light" : ""}`}
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary" : ""}`}
                    onChange={handleChange}
                    name="price"
                    value={formData.price}
                    id="price"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="instock"
                    className={`form-label ${mode === "dark" ? "text-light" : ""}`}
                  >
                    Instock
                  </label>
                  <input
                    type="number"
                    className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary" : ""}`}
                    onChange={handleChange}
                    name="instock"
                    value={formData.instock}
                    id="instock"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSave(formData);
                  }}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
