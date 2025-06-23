import Link from "next/link";
import React from "react";
import CountdownTimer from "./CountdownTimer";
import Marquee from "./Marquee";

// Static data - can be moved to a separate file if needed
const flashSaleData = {
  title: "SẢN PHẨM KHUYẾN MÃI",
  items: [
    {
      name: "Chuột Gaming Logitech G305",
      href: "/products/mouse-logitech-g305",
    },
    {
      name: "Bàn Phím Cơ Corsair K65",
      href: "/products/keyboard-corsair-k65",
    },
    {
      name: "Tai Nghe SteelSeries Arctis 7P",
      href: "/products/headset-arctis-7p",
    },
  ],
  endTime: new Date("2025-06-30T23:59:59"),
};

const FlashSale: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        {/* Flash Sale Header */}
        <h3 className="border-l-4 pl-1 text-xl uppercase font-bold">
          Khuyến mãi dành cho bạn
        </h3>

        <div className="bg-black text-white rounded-lg p-6 mt-12 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                HOT
              </span>
              <h2 className="text-xl font-bold">{flashSaleData.title}</h2>
              <Marquee items={flashSaleData.items} />
            </div>

            {/* Countdown Timer */}
            <CountdownTimer endTime={flashSaleData.endTime} />
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-4">
            <Link
              href="/danh-muc"
              className="bg-white text-black px-12 py-3 text-sm rounded hover:bg-gray-100 transition-colors duration-300"
            >
              Xem tất cả »
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
