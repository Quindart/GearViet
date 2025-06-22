import BannerGroup from "@/components/Home/BannerGroup";
import CategoryGroup from "@/components/Home/CategoryGroup";
import CollectionGroup from "@/components/Home/CollectionGroup";
import FlashSale from "@/components/Home/FlashSale";
import FourBanners from "@/components/Home/FourBanners";
import HomeSwiper from "@/components/Home/HomeSwiper";
import KeyboardCollection from "@/components/Home/KeyboardCollection";
import LatestNews from "@/components/Home/LatestNews";
import MonitorCollection from "@/components/Home/MonitorCollection";
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
        <CollectionGroup />
        <MonitorCollection />
        <KeyboardCollection />
        <LatestNews />
      </div>
    </div>
  );
}

export default HomePage;
