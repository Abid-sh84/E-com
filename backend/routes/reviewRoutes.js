import express from 'express';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:productId')
  .get(getProductReviews)
  .post(protect, createReview);

router.route('/:productId/:reviewId')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
