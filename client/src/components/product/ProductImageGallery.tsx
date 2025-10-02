import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  discount?: number;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  discount,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {discount && discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Tiết kiệm {discount}%
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
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
              src={image}
              alt={`${productName} ${index + 1}`}
              fill
              className="object-cover"
              sizes="120px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
