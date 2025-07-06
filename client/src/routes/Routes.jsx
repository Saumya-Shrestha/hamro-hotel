import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductDetail from "../pages/ProductDetail";
import CartItem from "../pages/CartItem";
import AddProduct from "../pages/AddProduct";
import ProductList from "../pages/ProductList";
import SearchResult from "../components/common/SearchResult";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = ({ mode }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home mode={mode} />}
      />
      <Route
        path="/about"
        element={<About mode={mode} />}
      />
      <Route
        path="/blog"
        element={<Blog mode={mode} />}
      />
      <Route
        path="/contact"
        element={<Contact mode={mode} />}
      />
      <Route
        path="/allproducts"
        element={<ProductList mode={mode} />}
      />
      <Route
        path="allproducts/:id/:title/:description/:price/:instock"
        element={<ProductDetail />}
      />
      <Route
        path="/cartitems"
        element={<CartItem mode={mode} />}
      />
      <Route
        path="/login"
        element={<Login mode={mode} />}
      />
      <Route
        path="/signup"
        element={<Signup mode={mode} />}
      />
      <Route
        path="/addproduct"
        element={<AddProduct mode={mode} />}
      />
      <Route
        path="/search/:searchQuery"
        element={<SearchResult />}
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile mode={mode} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
