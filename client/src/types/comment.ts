export interface Reply {
  _id: string;
  content: string;
  personName: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    _id: string;
    name: string;
    avatar?: {
      url: string;
      public_id: string;
    };
  };
}

export interface Comment {
  _id: string;
  product: string;
  personName: string;
  content: string;
  reply: Reply[];
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    name: string;
    avatar?: {
      url: string;
      public_id: string;
    };
  };
}

export interface CreateCommentData {
  productId: string;
  content: string;
  personName?: string;
}

export interface CreateReplyData {
  content: string;
  personName?: string;
}

