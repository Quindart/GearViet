import React from "react";
import CollectionGroup from "../CollectionGroup";
import {
  mockMonitorProducts,
  monitorTags,
} from "../CollectionGroup/mockCollectionData";

const MonitorCollection: React.FC = () => {
  return (
    <CollectionGroup
      title="MÀN HÌNH"
      tags={monitorTags}
      products={mockMonitorProducts}
      viewAllHref="/monitors"
    />
  );
};

export default MonitorCollection;
