const express = require("express");
const { fetchUser } = require("../middleware/FetchUser");
const { addProduct, getProduct, getAllProduct, updateProduct, deleteProduct } = require("../controller/productController");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/addproduct",
  fetchUser,
  [
    body("title").isLength({ min: 3 }).withMessage("Product name must be atleast 3 characters"),
    body("price").isNumeric().withMessage("Price should be a number"),
    body("description").isLength({ min: 3 }).withMessage("Description must be atleast 10 characters"),
    body("instock").isNumeric().withMessage("Instock should be a number"),
  ],
  addProduct
);

router.get("/allproduct", fetchUser, getProduct);

router.get("/allhomeproduct", fetchUser, getAllProduct);

router.put(
  "/updateproduct/:id",
  fetchUser,
  [
    body("title").isLength({ min: 3 }).withMessage("Product name must be atleast 3 characters"),
    body("price").isNumeric().withMessage("Price should be a number"),
    body("description").isLength({ min: 3 }).withMessage("Description must be atleast 10 characters"),
    body("instock").isNumeric().withMessage("Instock should be a number"),
  ],
  updateProduct
);

router.delete("/deleteproduct/:id", fetchUser, deleteProduct);

// router.post("/addtocart", fetchUser, addToCart);

module.exports = router;
