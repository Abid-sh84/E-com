import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Get product reviews
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  
  const product = await Product.findById(productId);
  
  if (product) {
    res.json(product.reviews);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create product review
// @route   POST /api/reviews/:productId
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, title, comment } = req.body;
  
  const product = await Product.findById(productId);
  
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    
    const review = {
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
      rating: Number(rating),
      title,
      comment,
    };
    
    product.reviews.push(review);
    product.reviewCount = product.reviews.length;
    product.rating = (
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / 
      product.reviews.length
    ).toFixed(1);
    
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update product review
// @route   PUT /api/reviews/:productId/:reviewId
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.params;
  const { rating, title, comment } = req.body;
  
  const product = await Product.findById(productId);
  
  if (product) {
    const reviewToUpdate = product.reviews.id(reviewId);
    
    if (!reviewToUpdate) {
      res.status(404);
      throw new Error('Review not found');
    }
    
    if (reviewToUpdate.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only update your own reviews');
    }
    
    reviewToUpdate.rating = Number(rating);
    reviewToUpdate.title = title;
    reviewToUpdate.comment = comment;
    
    // Update product rating
    product.rating = (
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / 
      product.reviews.length
    ).toFixed(1);
    
    await product.save();
    res.json({ message: 'Review updated' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product review
// @route   DELETE /api/reviews/:productId/:reviewId
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.params;
  
  const product = await Product.findById(productId);
  
  if (product) {
    const reviewToDelete = product.reviews.id(reviewId);
    
    if (!reviewToDelete) {
      res.status(404);
      throw new Error('Review not found');
    }
    
    if (
      reviewToDelete.user.toString() !== req.user._id.toString() && 
      !req.user.isAdmin
    ) {
      res.status(403);
      throw new Error('Not authorized');
    }
    
    // Filter out the review to delete
    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    
    product.reviewCount = product.reviews.length;
    
    if (product.reviews.length > 0) {
      product.rating = (
        product.reviews.reduce((acc, review) => acc + review.rating, 0) / 
        product.reviews.length
      ).toFixed(1);
    } else {
      product.rating = 0;
    }
    
    await product.save();
    res.json({ message: 'Review removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
};
