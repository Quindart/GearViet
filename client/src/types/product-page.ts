// Product interface for the product page
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  warranty: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  tags: string[];
}
