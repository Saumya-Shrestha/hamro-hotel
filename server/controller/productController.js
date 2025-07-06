const Product = require("../model/Product");
// const Cart = require("../model/Cart");
const { body, validationResult } = require("express-validator");

const addProduct = async (req, res) => {
  try {
    const { title, price, description, instock } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let image = req.files.map((el) => {
      return el.filename;
    });
    // console.log("Image From Frontend: ", image);
    const product = new Product({
      title,
      price,
      description,
      instock,
      image,
      user: req.user.id,
    });
    const saveProduct = await product.save();
    res.status(201).json({ saveProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery
      ? {
          title: { $regex: req.query.searchQuery, $options: "i" },
        }
      : {};
    const products = await Product.find({ ...searchQuery });
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     const { title, price, description, instock } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     if (!product.user || product.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: "Unauthorized acces" });
//     }
//     const product = await Product.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         user: req.user.id,
//       },
//       { title, price, description, instock },
//       { new: true }
//     );
//     res.status(200).json(product);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const updateProduct = async (req, res) => {
  const { title, price, description, instock } = req.body;
  try {
    const newProduct = {};
    if (title) newProduct.title = title;
    if (price) newProduct.price = price;
    if (description) newProduct.description = description;
    if (instock) newProduct.instock = instock;

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized acces" });
    }
    product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const deleteProduct = async (req, res) => {
//   try {
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     if (!product.user || product.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: "Unauthorized acces" });
//     }
//     const product = await Product.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.id,
//     });
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized acces" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
//     let cart = await Cart.findOne({ user: req.user.id });

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     if (!cart) {
//       cart = new Cart({
//         user: req.user.id,
//         products: [
//           {
//             product: productId,
//             title: product?.title,
//             description: product?.description,
//             price: product?.price,
//             instock: product?.instock,
//             quantity,
//           },
//         ],
//       });
//     } else {
//       const productItem = cart.products.find((item) => item.product.toString() === productId);
//       if (productItem) {
//         productItem.quantity += quantity;
//       } else {
//         cart.products.push({
//           product: productId,
//           title: product?.title,
//           description: product?.description,
//           price: product?.price,
//           instock: product?.instock,
//           quantity,
//         });
//       }
//     }
//     await cart.save();
//     res.status(200).json({ message: "Product added to cart", cart });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

module.exports = { addProduct, getProduct, getAllProduct, updateProduct, deleteProduct };
