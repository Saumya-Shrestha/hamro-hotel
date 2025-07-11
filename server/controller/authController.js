const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const secret = process.env.SECRET;
const gpass = process.env.PASS;

const createUser = async (req, res) => {
  // const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const data = {
      user: {
        id: user._id,
      },
    };
    var authToken = jwt.sign(data, secret);
    res.status(201).json({ message: "User Created Succesfully", user, authToken });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const data = {
      user: {
        id: user._id,
      },
    };
    var authToken = jwt.sign(data, secret);
    res.status(201).json({ success: true, message: "Login Successful", user, authToken });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

// Forgot Password Route
const forgotPassword = async (req, res) => {
  // Add validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ Status: "User doesn't exist!" });
    }

    // Generate JWT reset token
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "1d",
    });

    // Log the target email
    console.log("Sending password reset email to:", email);

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "saumyamanshrestha@gmail.com", // Your Gmail
        pass: gpass, // Your Gmail App Password
      },
      secure: true, // Use TLS
      port: 465,
    });

    const resetLink = `http://localhost:5173/reset-password/${user._id}/${token}`;

    const mailOptions = {
      from: "saumyamanshrestha@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ Status: "Email not sent", Error: error });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({ Status: "Success", Info: info.response });
      }
    });
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const resetPassword = async (req, res) => {
  // Add validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};

module.exports = { createUser, login, getUser, forgotPassword, resetPassword };
