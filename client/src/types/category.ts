export interface Subcategory {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  subcategory: Subcategory[];
  createdAt?: string;
  updatedAt?: string;
}

