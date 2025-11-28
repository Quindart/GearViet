import { api } from "@/lib/api";
import { Comment, CreateCommentData, CreateReplyData } from "@/types/comment";
import { CommentResponse, SingleCommentResponse } from "@/types/api-response";

/**
 * Get comments by product ID
 */
export const getCommentsByProduct = async (productId: string): Promise<Comment[]> => {
  try {
    const result = await api.get<{ success: boolean; status: number; comments: Comment[] }>(`/comment/product/${productId}`);
    return result.comments || [];
  } catch (error) {
    console.error("Get comments by product error:", error);
    return [];
  }
};

/**
 * Add a new comment
 */
export const addComment = async (data: CreateCommentData): Promise<Comment | null> => {
  try {
    const result = await api.post<SingleCommentResponse>(
      "/comment",
      data as unknown as Record<string, unknown>
    );
    return result.comment || null;
  } catch (error) {
    console.error("Add comment error:", error);
    return null;
  }
};

/**
 * Edit a comment
 */
export const editComment = async (
  commentId: string,
  data: { content: string }
): Promise<Comment | null> => {
  try {
    const result = await api.put<SingleCommentResponse>(
      `/comment/${commentId}`,
      data as unknown as Record<string, unknown>
    );
    return result.comment || null;
  } catch (error) {
    console.error("Edit comment error:", error);
    return null;
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (commentId: string): Promise<boolean> => {
  try {
    await api.delete(`/comment/${commentId}`);
    return true;
  } catch (error) {
    console.error("Delete comment error:", error);
    return false;
  }
};

/**
 * Add a reply to a comment
 */
export const addReply = async (
  commentId: string,
  data: CreateReplyData
): Promise<Comment | null> => {
  try {
    const result = await api.put<SingleCommentResponse>(
      `/comment/${commentId}/reply`,
      data as unknown as Record<string, unknown>
    );
    return result.comment || null;
  } catch (error) {
    console.error("Add reply error:", error);
    return null;
  }
};

