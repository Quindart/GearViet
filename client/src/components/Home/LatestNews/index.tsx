import React from "react";
import NewsPanel from "./NewsPanel";
import { mockGeneralNews, mockTechNews } from "./mockNewsData";

const LatestNews: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tin tức mới - 8/12 width */}
          <div className="lg:col-span-8">
            <NewsPanel
              title="TIN TỨC MỚI"
              news={mockGeneralNews}
              viewAllHref="/news"
              isMainPanel={true}
            />
          </div>

          {/* Tin tức công nghệ - 4/12 width */}
          <div className="lg:col-span-4">
            <NewsPanel
              title="TIN TỨC CÔNG NGHỆ"
              news={mockTechNews}
              viewAllHref="/tech-news"
              isMainPanel={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
