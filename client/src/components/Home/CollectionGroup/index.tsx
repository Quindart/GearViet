import React from "react";
import CollectionHeader from "./CollectionHeader";
import ProductGrid from "./ProductGrid";
import {
  mockPCGamingProducts,
  pcGamingTags,
  Product,
} from "./mockCollectionData";

interface CollectionGroupProps {
  title?: string;
  tags?: string[];
  products?: Product[];
  viewAllHref?: string;
}

const CollectionGroup: React.FC<CollectionGroupProps> = ({
  title = "PC GAMING",
  tags = pcGamingTags,
  products = mockPCGamingProducts,
  viewAllHref = "/pc-gaming",
}) => {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <CollectionHeader title={title} tags={tags} />
          <ProductGrid products={products} viewAllHref={viewAllHref} />
        </div>
      </div>
    </div>
  );
};

export default CollectionGroup;
