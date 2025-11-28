import React from "react";
import CollectionGroup from "../CollectionGroup";
import {
  monitorTags,
} from "../CollectionGroup/mockCollectionData";
import { Product } from "@/types/product";

interface MonitorCollectionProps {
  products: Product[];
}

const MonitorCollection: React.FC<MonitorCollectionProps> = ({ products }) => {
  return (
    <CollectionGroup
      title="MÀN HÌNH"
      tags={monitorTags}
      products={products}
      viewAllHref="/monitors"
    />
  );
};

export default MonitorCollection;
