import BannerGroup from "@/components/Home/BannerGroup";
import CategoryGroup from "@/components/Home/CategoryGroup";
import HomeSwiper from "@/components/Home/HomeSwiper";

function HomePage() {
  return (
    <div className="bg-[#f5f5f5]">
      <div className="min-h-[150px] container mx-auto">
        <HomeSwiper />
        <BannerGroup />
        <CategoryGroup />
        <h1>test</h1>
      </div>
    </div>
  );
}

export default HomePage;
