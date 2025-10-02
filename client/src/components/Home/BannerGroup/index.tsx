import Image from "next/image";

const BannerGroup = () => {
  return (
    <div className="w-full py-4 bg-white mt-4 rounded-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-4">
          {/* Banner 1 */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/assets/images/home-banner-01.webp"
              alt="Banner 1"
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Banner 2 */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/assets/images/home-banner-02.webp"
              alt="Banner 2"
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          {/* Banner 3 */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/assets/images/home-banner-03.webp"
              alt="Banner 3"
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerGroup;
