const express = require("express");
const { createUser, login, getUser, forgotPassword, resetPassword } = require("../controller/authController");
const { body, validationResult } = require("express-validator");
const { fetchUser } = require("../middleware/FetchUser");

const router = express.Router();

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }).withMessage("Name must be atleast 3 characters"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long."),
    body("email").isEmail().withMessage("Please enter a valid email"),
  ],
  createUser
);

router.post("/login", [body("email").isEmail().withMessage("Please enter a valid email")], login);

router.get("/getuser", fetchUser, getUser);

router.post("/forgot-password", [body("email").isEmail().withMessage("Please enter a valid email")], forgotPassword);

router.post(
  "/reset-password/:id/:token",
  [body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long.")],
  resetPassword
);

module.exports = router;
