"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get image URL from the product's images array
  const images = product.images || [];
  const mainImageUrl = images[selectedImage]?.url || images[selectedImage] || product.image?.url || "/images/placeholder-product.svg";

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={mainImageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => {
            const imageUrl = typeof image === 'string' ? image : image.url;
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-green-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
