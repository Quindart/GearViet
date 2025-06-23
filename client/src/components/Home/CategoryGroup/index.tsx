import React from "react";
import { mockCategoryData } from "./mockCategoryData";

const CategoryGroup: React.FC = () => {
  return (
    <div className="w-full py-8 bg-white mt-4 rounded-md">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-6">
          {mockCategoryData.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div
                className={`${category.bgColor} rounded-xl p-6 h-24 flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="text-white text-4xl">{category.icon}</div>
              </div>
              <h3 className="text-sm font-medium text-center text-gray-800 group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGroup;
