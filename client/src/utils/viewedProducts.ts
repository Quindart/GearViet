import { Product } from "@/types/product";

const VIEWED_PRODUCTS_KEY = "recently-viewed-products";
const MAX_VIEWED_PRODUCTS = 10;

export interface ViewedProduct {
  productId: string;
  product: Product;
  viewedAt: string;
}

export const addViewedProduct = (product: Product): void => {
  if (typeof window === "undefined") return;

  try {
    const viewedProducts = getViewedProducts();
    
    // Remove if already exists
    const filtered = viewedProducts.filter(
      (item) => item.productId !== product._id
    );
    
    // Add to beginning
    const updated = [
      { productId: product._id, product, viewedAt: new Date().toISOString() },
      ...filtered,
    ].slice(0, MAX_VIEWED_PRODUCTS);

    localStorage.setItem(VIEWED_PRODUCTS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving viewed product:", error);
  }
};

export const getViewedProducts = (): ViewedProduct[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(VIEWED_PRODUCTS_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as ViewedProduct[];
    
    return parsed.filter((item) => {
      if (!item.product || !item.productId) return false;
      const viewedDate = new Date(item.viewedAt);
      const daysSinceViewed = (Date.now() - viewedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceViewed <= 30;
    });
  } catch (error) {
    console.error("Error getting viewed products:", error);
    return [];
  }
};

export const clearViewedProducts = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(VIEWED_PRODUCTS_KEY);
  } catch (error) {
    console.error("Error clearing viewed products:", error);
  }
};

