import React from "react";
import CollectionSection from "./CollectionSection";
import { Product } from "@/types/product";

interface NewCollectionProps {
  newestProducts?: Product[];
  bestSellingProducts?: Product[];
}

const NewCollection: React.FC<NewCollectionProps> = ({ 
  newestProducts = [],
  bestSellingProducts = []
}) => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CollectionSection
            title="SẢN PHẨM MỚI"
            products={newestProducts}
            viewAllHref="/products?sort=newest"
          />
          <CollectionSection
            title="SẢN PHẨM BÁN CHẠY"
            products={bestSellingProducts}
            viewAllHref="/products?sort=bestselling"
          />
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
