"use client";

import { useEffect } from "react";
import { Product } from "@/types/product";
import { addViewedProduct } from "@/utils/viewedProducts";

interface ProductViewTrackerProps {
  product: Product;
}

export default function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    if (product && product._id) {
      addViewedProduct(product);
    }
  }, [product]);

  return null;
}

