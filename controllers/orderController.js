import Order from "../models/order.js";
import Product from "../models/product.js";

const createOrder = async (req, res) => {
  try {
    const { productId, totalAmount, shippingAddress } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const order = new Order({
      user: req.user.id,
      product: product._id,
      totalAmount,
      shippingAddress,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("product", "_id name image category price");
  res.json(orders);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email").populate("product", "_id name image category price");
  res.json(orders);
};

export { createOrder, getMyOrders, getAllOrders };
