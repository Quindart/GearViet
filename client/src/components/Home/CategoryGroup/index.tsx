import React from "react";
import Link from "next/link";
import { Category } from "@/types/category";

interface CategoryGroupProps {
  initialCategories?: Category[];
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ 
  initialCategories = [] 
}) => {
  // Map categories to display format
  const categoryIcons = ['🖥️', '🎮', '⌨️', '🖱️', '🎧', '💻', '📱', '🔊', '🎛️', '⚡'];
  const categoryColors = [
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-green-500 to-green-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-red-500 to-red-600',
    'bg-gradient-to-br from-yellow-500 to-yellow-600',
    'bg-gradient-to-br from-pink-500 to-pink-600',
    'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'bg-gradient-to-br from-teal-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-cyan-500 to-cyan-600',
  ];

  return (
    <div className="w-full py-8 bg-white mt-4 rounded-md">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-6">
          {initialCategories.slice(0, 10).map((category, index) => (
            <Link 
              key={category._id}
              href={`/products?category=${category._id}`}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div
                className={`${categoryColors[index % categoryColors.length]} rounded-xl p-6 h-24 flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="text-white text-4xl">{categoryIcons[index % categoryIcons.length]}</div>
              </div>
              <h3 className="text-sm font-medium text-center text-gray-800 group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGroup;
