import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import SmallBanner from "../components/common/SmallBanner";
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "../components/common/EditProductModal";

const Profile = ({ mode }) => {
  const context = useContext(ProductContext);
  const { user, loading } = useContext(AuthContext);
  const [userProducts, setUserProducts] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    state: { cart },
    dispatch,
    editProduct,
    deleteProduct,
  } = context;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getUserProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/allproduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUserProducts(data);
      console.log("User Products: ", data);
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  const toggleMenu = (id) => {
    setMenuVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct._id, updateData);
    getUserProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    getUserProducts();
  };

  useEffect(() => {
    getUserProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-easing="ease-out-cubic"
        >
          <SmallBanner title="Profile" />
        </div>
        <div className={`bg-${mode}`}>
          <div className="container py-5 text-center">
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="1200"
              data-aos-easing="ease-out-cubic"
            >
              <p className={mode === "light" ? "text-muted" : "text-light"}>Loading...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <SmallBanner title="Profile" />
      </div>
      <div className={`bg-${mode}`}>
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-12">
              <div
                className={`card shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark border-0"}`}
                data-aos="fade-up"
                data-aos-delay="150"
                data-aos-duration="1200"
                data-aos-easing="ease-out-cubic"
              >
                <div className="card-body">
                  <h4 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-3 fw-bold mb-4`}>User Information</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Name:</strong> {user?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {user?.email || "N/A"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Total Products:</strong> {userProducts.length}
                      </p>
                      <p>
                        <strong>Cart Items:</strong> {cart.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1200"
                data-aos-easing="ease-out-cubic"
              >
                <h4 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-2 fw-bold text-center pb-4`}>My Products</h4>
              </div>
            </div>
          </div>

          <div className="row">
            {userProducts.length > 0 ? (
              userProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="col-md-3 mb-4"
                  data-aos="fade-up"
                  data-aos-delay={450 + index * 100}
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <div className={`card shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark border-0"}`}>
                    <img
                      src={product.image?.[0] ? `http://localhost:5000/uploads/${product.image[0]}` : "/apple.png"}
                      className="card-img-top img-fluid rounded"
                      style={{ height: "300px", width: "100%", objectFit: "contain" }}
                      alt={product.title}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{product.title}</h5>
                        <BsThreeDots
                          onClick={() => toggleMenu(product._id)}
                          className={mode === "light" ? "light-accent-icon" : "dark-accent-icon"}
                          style={{ cursor: "pointer" }}
                        />
                        {menuVisible[product._id] && (
                          <div className={`menu-options ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark"}`}>
                            <button
                              className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} me-2`}
                              onClick={() => openEditModal(product)}
                            >
                              Edit
                            </button>
                            <button
                              className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"}`}
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">Rs. {product.price}</p>
                      <p className="card-text">Stock: {product.instock}</p>

                      {cart && cart.some((p) => p._id === product._id) ? (
                        <button
                          className={`btn btn-dark ${mode === "light" ? "dark-accent-button" : "light-accent-button"} px-4 py-2`}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: product,
                            })
                          }
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}
                          onClick={() =>
                            dispatch({
                              type: "ADD_TO_CART",
                              payload: product,
                            })
                          }
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div
                  data-aos="fade-up"
                  data-aos-delay="450"
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <p className={mode === "light" ? "text-muted" : "text-light"}>You haven't added any products yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalVisible && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={closeEditModal}
          onSave={saveEdit}
          mode={mode}
        />
      )}
    </>
  );
};

export default Profile;
