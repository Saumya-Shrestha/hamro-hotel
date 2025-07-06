import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import SmallBanner from "./SmallBanner";

const SearchResult = ({ mode = "light" }) => {
  const { searchQuery } = useParams();
  const context = useContext(ProductContext);
  const {
    state: { cart },
    allHomeProduct,
    product,
    dispatch,
  } = context;

  useEffect(() => {
    allHomeProduct(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <>
      <SmallBanner title={`Search Results for "${searchQuery}"`} />
      <div className={`bg-${mode}`}>
        <div className={`container py-5`}>
          <h4 className={`${mode === "light" ? "light-accent-icon" : "dark-accent-icon"} fs-2 fw-bold text-center pb-4`}>Search Results</h4>
          <div className="row">
            {product?.length > 0 ? (
              product.map((item) => (
                <div
                  className="col-md-3"
                  key={item._id}
                >
                  <div className={`card shadow-sm ${mode === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-dark border-0"}`}>
                    <img
                      src={item.image?.[0] ? `http://localhost:5000/uploads/${item.image[0]}` : "/apple.png"}
                      className="card-img-top img-fluid rounded"
                      style={{ height: "300px", width: "100%", objectFit: "contain" }}
                      alt={item.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">Rs. {item.price}</p>
                      {cart && cart.some((p) => p._id === item._id) ? (
                        <button
                          className={`btn btn-dark ${mode === "light" ? "dark-accent-button" : "light-accent-button"} px-4 py-2`}
                          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          className={`btn btn-dark ${mode === "light" ? "light-accent-button" : "dark-accent-button"} px-4 py-2`}
                          onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
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
                <p className={`${mode === "dark" ? "text-light" : "text-dark"} fs-4`}>No products found for "{searchQuery}".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
