import React from "react";

interface CollectionHeaderProps {
  title: string;
  tags: string[];
}

const CollectionHeader: React.FC<CollectionHeaderProps> = ({ title, tags }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      {/* Title */}
      <h2 className="border-l-4 border-primary pl-3 text-2xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Tags */}
      <div className="flex items-center gap-3">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-sm rounded-full transition-all duration-300 cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionHeader;
