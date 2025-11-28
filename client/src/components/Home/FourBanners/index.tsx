import Image from "next/image";

const FourBanners = () => {
  return (
    <div className="w-full py-4 bg-white mt-4 rounded-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Banner 1 */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <Image
              src="/assets/images/banner-1.avif"
              alt="Banner 1"
              width={300}
              height={180}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          {/* Banner 2 */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <Image
             src="/assets/images/banner-2.png"
              alt="Banner 2"
              width={300}
              height={180}
              className="rounded-lg object-cover  w-full h-full"
            />
          </div>

          {/* Banner 3 */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <Image
             src="/assets/images/banner-3.png"
              alt="Banner 3"
              width={300}
              height={180}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Banner 4 */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <Image
             src="/assets/images/banner-4.avif"
              alt="Banner 4"
              width={300}
              height={180}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourBanners;
