export interface Review {
  _id: string;
  product: string;
  user?: string;
  name: string;
  content: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  productId: string;
  content: string;
  score: number;
  name?: string;
}

export interface UpdateReviewData {
  content?: string;
  score?: number;
}

export interface ReviewStats {
  _id: number;
  count: number;
}

