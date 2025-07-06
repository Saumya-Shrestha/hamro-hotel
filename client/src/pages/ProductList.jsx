import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "../components/common/EditProductModal";
import SmallBanner from "../components/common/SmallBanner";
import { useParams } from "react-router-dom";

const ProductList = ({ mode }) => {
  const context = useContext(ProductContext);
  const params = useParams();
  const { searchQuery } = params;
  console.log("Search Text: ", searchQuery);

  const {
    product,
    allHomeProduct,
    state: { cart, products },
    // dispatch,
    editProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    getCart,
  } = context;
  console.log("Cart: ", cart);
  console.log("Product: ", products);

  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleMenu = (id) => {
    console.log("Fruit ID: ", id);
    setMenuVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    console.log("Edit item id: ", product._id);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    console.log("Save Edit Product: ", updateData);
    editProduct(selectedProduct._id, updateData);
  };

  const handleDelete = async (id) => {
    console.log("Delete item id: ", id);
    deleteProduct(id);
  };

  const handleAddToCart = async (fruit) => {
    try {
      await addToCart(fruit._id, 1);
      // dispatch({
      //   type: "ADD_TO_CART",
      //   payload: fruit,
      // });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async (fruit) => {
    try {
      await removeFromCart(fruit._id);
      // dispatch({
      //   type: "REMOVE_FROM_CART",
      //   payload: fruit,
      // });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
    allHomeProduct(searchQuery);
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <SmallBanner title="Products" />
      </div>
      <div className={`bg-${mode}`}>
        <div className={`container py-5`}>
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="1200"
            data-aos-easing="ease-out-cubic"
          >
            <h4 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-2 fw-bold text-center pb-4`}>Our Local Products</h4>
          </div>
          <div className="row">
            {product.map((fruit, index) => {
              return (
                <div
                  key={fruit._id}
                  className="col-md-3"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 100}
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <div className={`card shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark border-0"}`}>
                    <img
                      src={fruit.image[0] ? `http://localhost:5000/uploads/${fruit.image[0]}` : "/apple.png"}
                      className="card-img-top img-fluid rounded"
                      style={{ height: "300px", width: "100%", objectFit: "contain" }}
                      alt={fruit.title}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{fruit.title}</h5>
                        <BsThreeDots
                          onClick={() => toggleMenu(fruit._id)}
                          className={mode === "light" ? "light-accent-icon" : "dark-accent-icon"}
                        />
                        {menuVisible[fruit._id] && (
                          <div className={`menu-options ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark"}`}>
                            <button
                              className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} me-2`}
                              onClick={() => openEditModal(fruit)}
                            >
                              Edit
                            </button>
                            <button
                              className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"}`}
                              onClick={() => handleDelete(fruit._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="card-text">{fruit.description}</p>
                      <p className="card-text">Rs. {fruit.price}</p>

                      {cart && cart.some((p) => p._id === fruit._id) ? (
                        <button
                          className={`btn btn-dark ${mode === "light" ? "dark-accent-button" : "light-accent-button"} px-4 py-2`}
                          onClick={() => handleRemoveFromCart(fruit)}
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}
                          onClick={() => handleAddToCart(fruit)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                  {modalVisible && selectedProduct && selectedProduct._id === fruit._id && (
                    <EditProductModal
                      product={selectedProduct}
                      onClose={closeEditModal}
                      onSave={saveEdit}
                      mode={mode}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
