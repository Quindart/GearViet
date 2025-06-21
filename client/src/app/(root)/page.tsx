import BannerGroup from "@/components/Home/BannerGroup";
import CategoryGroup from "@/components/Home/CategoryGroup";
import FlashSale from "@/components/Home/FlashSale";
import FourBanners from "@/components/Home/FourBanners";
import HomeSwiper from "@/components/Home/HomeSwiper";
import NewCollection from "@/components/Home/NewCollection";

function HomePage() {
  return (
    <div className="bg-[#f5f5f5]">
      <div className="min-h-[150px] container mx-auto">
        <HomeSwiper />
        <BannerGroup />
        <CategoryGroup />
        <FlashSale />
        <NewCollection />
        <FourBanners />
        <h1>test</h1>
      </div>
    </div>
  );
}

export default HomePage;
