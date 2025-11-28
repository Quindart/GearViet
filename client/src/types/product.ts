import { Subcategory } from './category';

export interface ImageType {
  url: string;
  public_id: string;
}

export interface Product {
  _id: string;
  code: string;
  name: string;
  images: ImageType[];
  image: ImageType;
  price: number;
  description: string;
  available: number;
  brand: string;
  status: string;
  category: string;
  subcategory: Subcategory;
  totalComment?: number;
  avg_review?: number;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  selling?: number;
  width?: number;
  length?: number;
  height?: number;
  weight?: number;
}

export interface ProductFormData {
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
  width?: number;
  length?: number;
  height?: number;
  weight?: number;
}

export interface Brand {
  _id: string;
  name: string;
}

export interface FilterProductParams {
  categoryId?: string;
  subcategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  tags?: string[];
  available?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

