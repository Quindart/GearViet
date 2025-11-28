export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        
        {/* Price Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        
        {/* Stars Skeleton */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
          ))}
        </div>
        
        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  );
}

