import React from "react";
import CollectionGroup from "../CollectionGroup";
import {
  keyboardTags,
  mockKeyboardProducts,
} from "../CollectionGroup/mockCollectionData";

const KeyboardCollection: React.FC = () => {
  return (
    <CollectionGroup
      title="BÀN PHÍM CƠ"
      tags={keyboardTags}
      products={mockKeyboardProducts}
      viewAllHref="/keyboards"
    />
  );
};

export default KeyboardCollection;
