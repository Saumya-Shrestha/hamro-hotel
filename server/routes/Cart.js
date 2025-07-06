const express = require("express");
const router = express.Router();
const { fetchUser } = require("../middleware/FetchUser");
const { addToCart, getCart, updateCartItem, removeFromCart, clearCart, getCartItemCount } = require("../controller/cartController");

router.post("/addtocart", fetchUser, addToCart);

router.get("/getcart", fetchUser, getCart);

router.put("/updatecart", fetchUser, updateCartItem);

router.delete("/removecartitem/:productId", fetchUser, removeFromCart);

router.delete("/clearcart", fetchUser, clearCart);

router.get("/cartcount", fetchUser, getCartItemCount);

module.exports = router;
