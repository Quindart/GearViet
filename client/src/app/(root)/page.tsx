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
import { getAllCategories } from "@/services/categoryApi";
import { getAllProducts, getNewestProducts, getBestSellingProducts, filterProduct } from "@/services/productApi";

export default async function HomePage() {
  const categories = await getAllCategories();
  const newestProducts = await getNewestProducts(8);
  const bestSellingProducts = await getBestSellingProducts(8);
  
  // Fetch products for collections
  const allProducts = await getAllProducts({ page: 1, limit: 40 });
  
  // Filter products for different collections
  const pcGamingProducts = await filterProduct({ categoryId: categories.find(c => c.name?.toLowerCase().includes("pc"))?._id || "" }).catch(() => []);
  const monitorProducts = await filterProduct({ categoryId: categories.find(c => c.name?.toLowerCase().includes("monitor"))?._id || "" }).catch(() => []);
  const keyboardProducts = await filterProduct({ categoryId: categories.find(c => c.name?.toLowerCase().includes("keyboard"))?._id || "" }).catch(() => []);
  
  return (
    <div className="bg-[#f5f5f5]">
      <div className="min-h-[150px] container mx-auto">
        <HomeSwiper />
        <BannerGroup />
        <CategoryGroup initialCategories={categories} />
        <FlashSale />
        <NewCollection newestProducts={newestProducts} bestSellingProducts={bestSellingProducts} />
        <FourBanners />
        <CollectionGroup title="PC GAMING" products={pcGamingProducts.slice(12, 20)} viewAllHref="/products?category=pc-gaming" />
        <MonitorCollection products={monitorProducts.slice(8, 12)} />
        <KeyboardCollection products={keyboardProducts.slice(0, 8)} />
        <LatestNews />
      </div>
    </div>
  );
}
