import { useAppStore } from '@/store';

const useApp = () => {
  const {
    categories,
    brands,
    isLoading,
    hideSidebar: hideSideBar,
    fetchCategories,
    fetchBrands: getAllBrand,
    setIsLoading,
    setHideSidebar: setShowSideBar,
  } = useAppStore();

  return {
    getAllBrand,
    brands,
    categories,
    hideSideBar,
    fetchCategories,
    setShowSideBar,
    setIsLoading,
    isLoading,
  };
};

export default useApp;
