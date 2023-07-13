const Product = require('../models/Product');

// Create a new product
async function createProduct(req, res) {
  try {
    const { productname, description, price, images, category } = req.body;
    const product = new Product({
      productname,
      description,
      price,
      images,
      category
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

// Get a single product by ID
async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

// Update a product
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { productname, description, price, images, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        productname,
        description,
        price,
        images,
        category,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
