"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./styles.css";

interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice?: number;
  salePrice: number;
  discount?: number;
  href: string;
}

interface CollectionSectionProps {
  title: string;
  products: Product[];
  viewAllHref: string;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({
  title,
  products,
  viewAllHref,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-2 h-2 bg-gray-300 rounded-full hover:bg-primary transition-colors duration-300" />
    ),
    dotsClass: "slick-dots !-bottom-3 custom-dots",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="border-l-4 border-primary pl-2 text-lg font-bold text-gray-800">
          {title}
        </h3>
        <Link
          href={viewAllHref}
          className="text-gray-500 hover:text-primary text-sm transition-colors duration-300"
        >
          Xem tất cả »
        </Link>
      </div>

      {/* Product Slider */}
      <div className="relative">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-4 py-6">
              <Link href={product.href} className="block group">
                <div className="relative mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h4>

                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold text-lg">
                      {product.salePrice.toLocaleString("vi-VN")}đ
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {product.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CollectionSection;
