import React from "react";
import CollectionGroup from "../CollectionGroup";
import {
  keyboardTags,
} from "../CollectionGroup/mockCollectionData";
import { Product } from "@/types/product";

interface KeyboardCollectionProps {
  products: Product[];
}

const KeyboardCollection: React.FC<KeyboardCollectionProps> = ({ products }) => {
  return (
    <CollectionGroup
      title="BÀN PHÍM CƠ"
      tags={keyboardTags}
      products={products}
      viewAllHref="/keyboards"
    />
  );
};

export default KeyboardCollection;
