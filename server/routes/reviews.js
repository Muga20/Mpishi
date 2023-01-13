
import express from "express"; 

import { 
    getAllReviews,
    createReviews,
    getReviewsById,
    updateReviews,
    deleteReviews,
   
  
} from "../controllers/reviews.js";
 
const ReviewsRoutes = express.Router();
 
ReviewsRoutes .get('/', getAllReviews);
ReviewsRoutes .get('/:id', getReviewsById);
ReviewsRoutes .post('/',createReviews);
ReviewsRoutes .patch('/:id',updateReviews);
ReviewsRoutes .delete('/:id', deleteReviews);

export default ReviewsRoutes;
