import { useState } from 'react';
import { ReviewStatsType, ReviewType } from '../types/product';
import { fetchReviewByProductId } from '../services/reviewApi';
import { ResponseType } from 'types';

const useReview = () => {
  const [listAllReviews, setListAllReviews] = useState<ReviewType[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewStatsType[]>([]);

  const getAllReviews = async (productId: string) => {
    try {
      const response: ResponseType = await fetchReviewByProductId(productId);
      if (response.success && response.reviews && response.stats) {
        setListAllReviews(response.reviews);
        setReviewStats(response.stats);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return {
    reviewStats,
    listAllReviews,
    getAllReviews,
  };
};

export default useReview;
