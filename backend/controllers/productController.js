import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.page) || 1;
  
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};
    
  const category = req.query.category ? { category: req.query.category } : {};
  const universe = req.query.universe ? { universe: req.query.universe } : {};
  const type = req.query.type ? { type: req.query.type } : {};
  
  // Handle price range filter
  let priceFilter = {};
  if (req.query.price) {
    const [min, max] = req.query.price.split('-').map(Number);
    priceFilter = { price: { $gte: min || 0, $lte: max || Infinity } };
  }
  
  // Combine all filters
  const filters = {
    ...keyword,
    ...category,
    ...universe,
    ...type,
    ...priceFilter,
  };
  
  const count = await Product.countDocuments(filters);
  const products = await Product.find(filters)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    
  // Apply sorting
  const sortBy = req.query.sort || 'newest';
  
  switch (sortBy) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
      products.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
    default:
      products.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }

  res.json({ 
    products, 
    page, 
    pages: Math.ceil(count / pageSize),
    count
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    category,
    universe,
    type,
    countInStock,
    sizes,
    discount,
    isNew,
  } = req.body;

  const product = new Product({
    name,
    price,
    description,
    images,
    category,
    universe,
    type,
    countInStock,
    sizes,
    discount,
    isNew,
    rating: 0,
    reviewCount: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    images,
    category,
    universe,
    type,
    countInStock,
    sizes,
    discount,
    isNew,
  } = req.body;

  const product = await Product.findById(req.params.id);
  
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.images = images || product.images;
    product.category = category || product.category;
    product.universe = universe || product.universe;
    product.type = type || product.type;
    product.countInStock = countInStock || product.countInStock;
    product.sizes = sizes || product.sizes;
    product.discount = discount !== undefined ? discount : product.discount;
    product.isNew = isNew !== undefined ? isNew : product.isNew;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;

  const product = await Product.findById(req.params.id);
  
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      title,
      comment,
      user: req.user._id,
      avatar: req.user.avatar,
    };

    product.reviews.push(review);
    product.reviewCount = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

// @desc    Get new arrivals
// @route   GET /api/products/new
// @access  Public
const getNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isNew: true }).sort({ createdAt: -1 }).limit(8);
  res.json(products);
});

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getNewProducts,
  getProductsByCategory,
};
