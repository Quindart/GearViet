"use client";

import SharedIcon from "@/components/shared/icons";
import { IconName } from "@/constants/icons";
import Link from "next/link";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { headerData } from "../../layout/Header/mockHeaderData";
import Swiper from "./Swiper";

const HomeMegaMenu = () => {
  // Map category icons to available SharedIcon names
  const getIconName = (icon: string): IconName => {
    const iconMap: { [key: string]: IconName } = {
      PC: "MENU",
      CPU: "MENU",
      COMPONENTS: "MENU",
      MONITOR: "MENU",
      GAMEPAD: "MENU",
      LAPTOP: "MENU",
      FURNITURE: "MENU",
      STREAMING: "MENU",
      ACCESSORIES: "MENU",
      SPEAKER: "MENU",
    };
    return iconMap[icon] || "MENU";
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex h-full" onMouseLeave={() => setActiveCategory(null)}>
      {/* Main Categories */}
      <div className="w-full bg-white border-r border-gray-200 max-h-full overflow-y-auto">
        {headerData.map((category, index) => (
          <div
            key={index}
            onMouseEnter={() =>
              setActiveCategory(category.submenu ? category.title : null)
            }
            className={`relative ${
              activeCategory === category.title ? "bg-gray-50" : ""
            }`}
          >
            <Link
              href={category.href}
              className={`flex items-center gap-2 px-3 py-2 group justify-between hover:bg-gray-50 transition-all duration-300 text-base`}
              onClick={(e) => {
                if (category.submenu) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-center gap-2">
                <SharedIcon
                  iconName={getIconName(category.icon)}
                  width={16}
                  height={16}
                  type="ICON"
                  className="text-gray-500 group-hover:text-primary"
                />
                <span className="font-medium text-gray-700 group-hover:text-primary whitespace-nowrap transition-all duration-400 text-base">
                  {category.title}
                </span>
              </div>
              {category.submenu && (
                <FaChevronRight className="text-black w-2 h-2" />
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* Submenu Panel */}
      {activeCategory &&
        headerData.find((cat) => cat.title === activeCategory)?.submenu && (
          <div className="absolute left-full top-0 min-w-[960px] h-full overflow-y-auto shadow-lg bg-white border border-gray-200 z-50">
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {headerData
                  .find((cat) => cat.title === activeCategory)
                  ?.submenu?.map((submenu, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-gray-900 pb-1 border-b border-gray-200 text-sm">
                        {submenu.title}
                      </h3>
                      <ul className="space-y-1">
                        {submenu.items.slice(0, 8).map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.href}
                              className="text-xs text-gray-600 hover:text-primary block py-0.5"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const HomeSwiper = () => {
  return (
    <div className="flex w-full h-[480px] bg-gray-100">
      <div className="w-3/12 relative border border-gray-200 bg-white">
        <HomeMegaMenu />
      </div>
      <div className="w-9/12 bg-blue-300 m-3 rounded-xl overflow-hidden">
        <Swiper />
      </div>
    </div>
  );
};

export default HomeSwiper;
