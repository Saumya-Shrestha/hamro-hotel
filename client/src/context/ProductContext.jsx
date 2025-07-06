import React, { createContext, useReducer, useState } from "react";
import { cartReducer } from "./Reducer";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const products = [
    {
      _id: 1,
      image: "/apple.png",
      title: "Apple",
      description: "This is a local product of mustang",
      price: 200,
      instock: 5,
    },
    {
      _id: 2,
      image: "/mango.png",
      title: "Mango",
      description: "This is a local product of terai",
      price: 300,
      instock: 2,
    },
    {
      _id: 3,
      image: "/banana.png",
      title: "Banana",
      description: "This is a local product of gorkha",
      price: 150,
      instock: 3,
    },
    {
      _id: 4,
      image: "/grapes.png",
      title: "Grapes",
      description: "This is a local product of ilam",
      price: 400,
      instock: 4,
    },
  ];

  const [product, setProduct] = useState(products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  const [count, setCount] = useState(10);
  const [news, setnews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=e09d9f7d5a38417fac4d41c193572a25");
      const data = await response.json();
      setnews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setnews({ articles: [] });
    }
  };

  const allProduct = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/allproduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProduct(data);
      console.log("Data From Backend: ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const allHomeProduct = async (searchQuery = "") => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/allhomeproduct?searchQuery=${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProduct(data);
      console.log("Data From Backend: ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editProduct = async (id, updateData) => {
    const { title, description, price, instock } = updateData;
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, price, instock }),
      });
      const data = await response.json();
      console.log("Data from backend: ", data);
      allProduct();
    } catch (error) {
      console.log("Error: ", error);
      throw new Error("Failed to update product.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/product/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Data deleted: ", data);
      allProduct();
    } catch (error) {
      console.log("Error: ", error);
      throw new Error("Failed to delete product.");
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        await getCart();
        return data;
      } else {
        console.error("Error adding to cart:", data.error);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getCart = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/getcart`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log("Raw cart data from backend:", data);

      if (response.ok) {
        const cartItems = data.products
          ? data.products.map((item) => ({
              _id: item.product._id,
              title: item.product.title,
              description: item.product.description,
              price: item.product.price,
              instock: item.product.instock,
              qty: item.quantity,
              image: item.product.image || [],
            }))
          : [];

        console.log("Transformed cart items:", cartItems);
        dispatch({ type: "SET_CART", payload: cartItems });
        return cartItems;
      } else {
        console.error("Failed to fetch cart:", data.message || "Unknown error");
        dispatch({ type: "SET_CART", payload: [] });
        return [];
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      dispatch({ type: "SET_CART", payload: [] });
      return [];
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/updatecart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        await getCart();
        return data;
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/removecartitem/${productId}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        await getCart();
        return data;
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/clearcart`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CLEAR_CART" });
        return data;
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getCartItemCount = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/cartcount`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data.count;
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        product,
        allProduct,
        allHomeProduct,
        editProduct,
        deleteProduct,
        setProduct,
        count,
        setCount,
        news,
        fetchData,
        addToCart,
        getCart,
        updateCart,
        removeFromCart,
        clearCart,
        getCartItemCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
