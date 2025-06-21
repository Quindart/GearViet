import React from "react";
import CollectionSection from "./CollectionSection";
import { mockBestSellers, mockNewProducts } from "./mockCollectionData";

const NewCollection: React.FC = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CollectionSection
            title="SẢN PHẨM MỚI"
            products={mockNewProducts}
            viewAllHref="/san-pham-moi"
          />
          <CollectionSection
            title="SẢN PHẨM BÁN CHẠY"
            products={mockBestSellers}
            viewAllHref="/san-pham-ban-chay"
          />
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
