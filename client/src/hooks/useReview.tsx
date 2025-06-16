import { useSnackbar } from 'notistack';
import { useReviewStore } from '../store';

const useReview = () => {
  const {
    reviews: listAllReviews,
    stats: reviewStats,
    isLoading,
    error,
    fetchReviews: getAllReviews,
    createReview,
    updateReview,
    deleteReview,
  } = useReviewStore();

  const { enqueueSnackbar } = useSnackbar();

  const handleCreateReview = async (productId: string, data: { rating: number; comment: string; images?: string[] }) => {
    try {
      await createReview(productId, data);
      enqueueSnackbar('Review created successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating review';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleUpdateReview = async (reviewId: string, data: { rating: number; comment: string; images?: string[] }) => {
    try {
      await updateReview(reviewId, data);
      enqueueSnackbar('Review updated successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating review';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      enqueueSnackbar('Review deleted successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting review';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return {
    reviewStats,
    listAllReviews,
    isLoading,
    error,
    getAllReviews,
    createReview: handleCreateReview,
    updateReview: handleUpdateReview,
    deleteReview: handleDeleteReview,
  };
};

export default useReview;
