import React from "react";
import "./styles.css";

interface MarqueeItem {
  name: string;
  href: string;
}

interface MarqueeProps {
  items: MarqueeItem[];
}

const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  return (
    <div className="hidden md:block text-gray-300 flex-1 overflow-hidden max-w-[600px]">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="hover:text-white transition-colors duration-300 inline-block"
          >
            {item.name}
          </a>
        ))}
        {/* Duplicate items for seamless infinite loop */}
        {items.map((item, index) => (
          <a
            key={`duplicate-${index}`}
            href={item.href}
            className="hover:text-white transition-colors duration-300 inline-block"
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
