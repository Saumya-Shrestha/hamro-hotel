import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import SmallBanner from "../components/common/SmallBanner";
import { MdDelete } from "react-icons/md";

const CartItem = ({ mode }) => {
  const context = useContext(ProductContext);

  const {
    state: { cart },
    updateCart,
    removeFromCart,
    clearCart,
    getCart,
  } = context;

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await updateCart(productId, newQuantity);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartItems = Array.isArray(cart) ? cart : [];

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <SmallBanner
          title="Cart Items"
          mode={mode}
        />
      </div>
      <div className={`bg-${mode}`}>
        <div className="container py-5">
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            data-aos-duration="1200"
            data-aos-easing="ease-out-cubic"
          >
            <div className="d-flex justify-content-between align-items-center pb-4">
              <h4 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-2 fw-bold`}>Your Fruit Basket</h4>
              {cartItems.length > 0 && (
                <button
                  className={`btn btn-outline-danger ${mode === "dark" ? "border-danger text-danger" : ""}`}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
          <div className="row">
            {cartItems.length > 0 ? (
              <div className="col-md-8">
                {cartItems.map((item, index) => {
                  console.log("Rendering cart item:", item);
                  return (
                    <div
                      key={item._id}
                      className={`card mb-3 shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark border-0"}`}
                      data-aos="fade-up"
                      data-aos-delay={300 + index * 100}
                      data-aos-duration="1200"
                      data-aos-easing="ease-out-cubic"
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-md-2 text-center">
                          <img
                            src={
                              item.image && Array.isArray(item.image) && item.image.length > 0
                                ? `http://localhost:5000/uploads/${item.image[0]}`
                                : "/apple.png"
                            }
                            alt={item.title || "Product"}
                            className="img-fluid rounded"
                            style={{ maxHeight: "80px" }}
                            onError={(e) => {
                              e.target.src = "/apple.png";
                            }}
                          />
                        </div>
                        <div className="col-md-5">
                          <div className="card-body">
                            <h5 className={`card-title mb-1 ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}>
                              {item.title || "Unknown Product"}
                            </h5>
                            <p className="card-text mb-0">Rs. {item.price || 0}</p>
                            <small className={mode === "dark" ? "text-light" : "text-muted"}>{item.description || "No description"}</small>
                          </div>
                        </div>
                        <div className="col-md-3 text-center">
                          <label
                            htmlFor={`qty-${item._id}`}
                            className={`form-label mb-0 pe-2 ${mode === "dark" ? "text-light" : "text-dark"}`}
                          >
                            Qty:
                          </label>
                          <select
                            value={item.qty || 1}
                            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                            className={`form-select form-select-sm mt-1 ${
                              mode === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"
                            }`}
                            style={{ width: "70px", display: "inline-block" }}
                          >
                            {[...Array(Math.max(1, item.instock || 1)).keys()].map((x) => (
                              <option
                                value={x + 1}
                                key={x + 1}
                              >
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2 text-center">
                          <MdDelete
                            size={22}
                            className={mode === "dark" ? "dark-accent-icon" : "light-accent-icon"}
                            onClick={() => handleRemoveItem(item._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col-md-8">
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-duration="1200"
                  data-aos-easing="ease-out-cubic"
                >
                  <h4 className={`${mode === "dark" ? "dark-accent-icon" : "light-accent-icon"} text-center`}>Your Cart Is Empty :(</h4>
                </div>
              </div>
            )}

            <div className="col-md-4">
              <div
                className={`card p-3 shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark border-0"}`}
                data-aos="fade-up"
                data-aos-delay="450"
                data-aos-duration="1200"
                data-aos-easing="ease-out-cubic"
              >
                <h4 className={`mb-3 ${mode === "light" ? "light-accent-icon" : "dark-accent-icon"}`}>Order Summary</h4>
                <p>
                  Total Items: <strong>{cartItems.reduce((acc, item) => acc + (item.qty || 0), 0)}</strong>
                </p>
                <p>
                  Total Price: <strong>Rs. {cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0)}</strong>
                </p>
                <button className={`btn btn-dark w-100 mt-2 ${mode === "light" ? "light-accent-button" : "dark-accent-button"}`}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
