const Product = require('../models/productModel');
const APIFeatures = require('../utils/apifeatures');

// Get all products - api/v1/products
exports.getProducts = async (req, res, next) => {
  try {
    const resPerPage =2;
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    apiFeatures.search().filter(); // Apply search and filter operations
    const products = await apiFeatures.query; // Access the query property
      res.status(200).json({
          success: true,
          count: products.length, 
          products
      });
  } catch (error) {
      next(error); // Pass any errors to the error handling middleware
  }
};

// Create a new product - api/v1/product/new
exports.newProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// Get a single product - api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// Update a product - api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// Delete a product - api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Product Deleted!"
    });
  } catch (error) {
    next(error);
  }
};
