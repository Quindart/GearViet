import { api } from "@/lib/api";

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  videoLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  productId: number;
  rating: number;
  comment: string;
  images?: File[];
  videoLink?: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
  images?: File[];
  videoLink?: string;
}

/**
 * Get reviews by product ID
 */
export const fetchReviewByProductId = async (productId: string | number): Promise<Review[]> => {
  try {
    const result = await api.get<Review[]>(`/review/product/${productId}`);
    return result.data || [];
  } catch (error) {
    console.error("Fetch reviews by product ID error:", error);
    return [];
  }
};

/**
 * Get review by ID
 */
export const getReviewById = async (reviewId: string | number): Promise<Review | null> => {
  try {
    const result = await api.get<Review>(`/review/${reviewId}`);
    return result.data || null;
  } catch (error) {
    console.error("Get review by ID error:", error);
    return null;
  }
};

/**
 * Create a new review
 */
export const createReview = async (reviewData: CreateReviewData): Promise<Review | null> => {
  try {
    // If there are images, we need to upload them first
    if (reviewData.images && reviewData.images.length > 0) {
      const formData = new FormData();
      formData.append('productId', reviewData.productId.toString());
      formData.append('rating', reviewData.rating.toString());
      formData.append('comment', reviewData.comment);
      
      if (reviewData.videoLink) {
        formData.append('videoLink', reviewData.videoLink);
      }

      // Add images to form data
      reviewData.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const result = await api.upload<Review>('/review', formData);
      return result.data || null;
    } else {
      // No images, send as JSON
      const result = await api.post<Review>('/review', {
        productId: reviewData.productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        videoLink: reviewData.videoLink,
      });
      return result.data || null;
    }
  } catch (error) {
    console.error("Create review error:", error);
    return null;
  }
};

/**
 * Update a review
 */
export const updateReview = async (
  reviewId: string | number,
  reviewData: UpdateReviewData
): Promise<Review | null> => {
  try {
    const result = await api.put<Review>(`/review/${reviewId}`, reviewData as Record<string, unknown>);
    return result.data || null;
  } catch (error) {
    console.error("Update review error:", error);
    return null;
  }
};

/**
 * Delete a review
 */
export const deleteReview = async (reviewId: string | number): Promise<boolean> => {
  try {
    await api.delete(`/review/${reviewId}`);
    return true;
  } catch (error) {
    console.error("Delete review error:", error);
    return false;
  }
};