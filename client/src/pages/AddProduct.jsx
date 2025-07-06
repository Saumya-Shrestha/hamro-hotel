import React, { useState } from "react";
import SmallBanner from "../components/common/SmallBanner";
import axios from "axios";

const AddProduct = ({ mode }) => {
  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    instock: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
      console.log("Uploaded File: ", e.target.files[0]);
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("The product has been added.");
    const formData = new FormData();
    if (product.image) {
      formData.append("image", product.image);
    }
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("instock", product.instock);
    try {
      const response = await axios.post("http://localhost:5000/api/product/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log("Response data:", response.data);
      if (response) {
        console.log("Product Added Successfully!");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <SmallBanner
        title="Add Product"
        mode={mode}
      />
      <div className={`bg-${mode} bg-gradient`}>
        <div className={`container d-flex justify-content-center align-items-center py-5`}>
          <div className="row w-100 justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className={`card shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark border-0"}`}>
                <div className="card-body">
                  <h5 className={`mb-4 text-center ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-2 fw-bold`}>Add New Product</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="image"
                        className={`form-label ${mode === "dark" ? "text-light" : ""}`}
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        multiple
                        onChange={handleChange}
                        className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
                        id="image"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="title"
                        className={`form-label ${mode === "dark" ? "text-light" : ""}`}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
                        id="title"
                        placeholder="Enter product title"
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
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
                        id="description"
                        placeholder="Enter product description"
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
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
                        id="price"
                        placeholder="Enter price"
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
                        name="instock"
                        value={product.instock}
                        onChange={handleChange}
                        className={`form-control ${mode === "dark" ? "bg-dark text-light border-secondary dark-mode-input" : ""}`}
                        id="instock"
                        placeholder="Enter available stock"
                      />
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
