import Link from "next/link";
import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {/* Home Icon */}
      <Link
        href="/"
        className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
      >
        <FaHome className="w-4 h-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {/* Separator */}
            <FaChevronRight className="w-3 h-3 text-gray-400" />

            {/* Breadcrumb Item */}
            {isLast || !item.href ? (
              <span className="flex items-center gap-1 text-gray-800 font-medium">
                {item.icon && item.icon}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors"
              >
                {item.icon && item.icon}
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
