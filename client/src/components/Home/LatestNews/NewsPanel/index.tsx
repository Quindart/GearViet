import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NewsItem } from "../mockNewsData";

interface NewsPanelProps {
  title: string;
  news: NewsItem[];
  viewAllHref: string;
  isMainPanel: boolean;
}

const NewsPanel: React.FC<NewsPanelProps> = ({
  title,
  news,
  viewAllHref,
  isMainPanel,
}) => {
  const displayNews = isMainPanel ? news.slice(0, 6) : news.slice(0, 4);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-white text-sm hover:text-red-100 transition-colors duration-200 flex items-center gap-1"
        >
          Xem tất cả »
        </Link>
      </div>

      {/* News List */}
      <div className="p-6">
        {isMainPanel ? (
          // Main panel layout - First item larger, rest in grid
          <div className="space-y-6">
            {/* Featured Article */}
            {displayNews[0] && (
              <Link href={displayNews[0].href} className="block group">
                <div className="flex gap-4 pb-6 border-b border-gray-200">
                  <div className="flex-shrink-0">
                    <Image
                      src={displayNews[0].image}
                      alt={displayNews[0].title}
                      className="w-32 h-24 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      width={128}
                      height={96}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 overflow-hidden">
                      {displayNews[0].title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2 overflow-hidden">
                      {displayNews[0].excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-gray-500 text-xs">📅</span>
                      <span className="text-gray-500 text-xs">
                        {displayNews[0].date}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayNews.slice(1).map((item) => (
                <Link key={item.id} href={item.href} className="block group">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                        width={80}
                        height={64}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 overflow-hidden">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-gray-500 text-xs">📅</span>
                        <span className="text-gray-500 text-xs">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Side panel layout - All items same size
          <div className="space-y-4">
            {displayNews.map((item) => (
              <Link key={item.id} href={item.href} className="block group">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                      width={80}
                      height={64}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 overflow-hidden">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-gray-500 text-xs">📅</span>
                      <span className="text-gray-500 text-xs">{item.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPanel;
