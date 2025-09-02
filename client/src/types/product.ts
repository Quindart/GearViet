import { Subcategory } from '@/types';
import { IUser } from './user';

export type ImageType = {
  url: string;
  public_id: string;
};

export interface ProductFormDataType {
  name: string;
  code: string;
  images: ImageType[];
  price: number;
  description: string;
  available: number;
  brand: string;
  category: string;
  subcategory: string;
  tags: string[];
  // size?: {
  width?: number;
  length?: number;
  height?: number;
  weight?: number;
  // };
}

export interface ProductDataType {
  _id: string;
  code: string;
  name: string;
  images: ImageType[];
  image: ImageType;
  price: number;
  description: string;
  available: number;
  brand: string;
  status: string | undefined;
  category: string;
  subcategory: Subcategory;
  totalComment?: number;
  avg_review?: number;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  selling?: number;
  size: {
    width: number;
    length: number;
    height: number;
    weight: number;
  };
}

export interface FormDataType {
  [key: string]: string | number | boolean | File | undefined;
}

export interface CommentType {
  _id: string;
  product: string;
  personName: string;
  comment: string;
  reply: ReplyType[];
  createdAt: string;
  updatedAt: string;
  user?: IUser;
}

export interface ReplyType {
  _id: string;
  content: string;
  personName: string;
  createdAt?: string;
  updatedAt?: string;
  user: IUser;
}

export interface ReviewType {
  _id: string;
  product: string;
  content: string;
  name: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  user?: IUser;
  stats?: ReviewStatsType;
}

export interface ReviewStatsType {
  _id: number;
  count: number;
}
