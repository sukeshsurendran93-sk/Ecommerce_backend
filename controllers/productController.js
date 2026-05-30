import Product from "../models/product.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query.keyword) {
      query.name = { $regex: req.query.keyword, $options: "i" };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }
    let apiQuery = Product.find(query);
    if (req.query.sortBy) {
      if (req.query.sortBy === "price_asc") {
        apiQuery = apiQuery.sort({ price: 1 });
      } else if (req.query.sortBy === "price_desc") {
        apiQuery = apiQuery.sort({ price: -1 });
      }
    }
    const products = await apiQuery;
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    image,
  });
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product removed" });
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
};
