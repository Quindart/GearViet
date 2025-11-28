import { api } from "@/lib/api";
import { Review, CreateReviewData, UpdateReviewData } from "@/types/review";
import { ReviewResponse, SingleReviewResponse } from "@/types/api-response";

/**
 * Get reviews by product ID
 */
export const getReviewsByProduct = async (productId: string): Promise<Review[]> => {
  try {
    const result = await api.get<ReviewResponse>(`/review/product/${productId}`);
    return result.reviews || [];
  } catch (error) {
    console.error("Get reviews by product error:", error);
    return [];
  }
};

/**
 * Get review by ID
 */
export const getReviewById = async (reviewId: string | number): Promise<Review | null> => {
  try {
    const result = await api.get<SingleReviewResponse>(`/review/${reviewId}`);
    return result.review || null;
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
    const result = await api.post<SingleReviewResponse>(
      "/review",
      reviewData as unknown as Record<string, unknown>
    );
    return result.review || null;
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
    const result = await api.put<SingleReviewResponse>(
      `/review/${reviewId}`,
      reviewData as unknown as Record<string, unknown>
    );
    return result.review || null;
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