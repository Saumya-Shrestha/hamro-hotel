const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        products: [
          {
            product: productId,
            title: product.title,
            description: product.description,
            price: product.price,
            instock: product.instock,
            quantity,
          },
        ],
      });
    } else {
      const productItem = cart.products.find((item) => item.product.toString() === productId);
      if (productItem) {
        productItem.quantity += quantity;
      } else {
        cart.products.push({
          product: productId,
          title: product.title,
          description: product.description,
          price: product.price,
          instock: product.instock,
          quantity,
        });
      }
    }
    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.product", "title description price instock image");
    if (!cart) {
      return res.status(200).json({ products: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productItem = cart.products.find((item) => item.product.toString() === productId);
    if (productItem) {
      if (quantity <= 0) {
        cart.products = cart.products.filter((item) => item.product.toString() !== productId);
      } else {
        productItem.quantity = quantity;
      }
      await cart.save();
      res.status(200).json({ message: "Cart updated", cart });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products = cart.products.filter((item) => item.product.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCartItemCount = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    const itemCount = cart ? cart.products.reduce((total, item) => total + item.quantity, 0) : 0;
    res.status(200).json({ count: itemCount });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartItemCount,
};
