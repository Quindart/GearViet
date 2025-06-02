import { ResponseType } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setSidebar, changeLoadingStatus, setBrands } from 'store/slices/appSlice';
import { RootState } from 'store';
import { fetchAllCategories } from 'services/appApi';
import { fetchAllBrands } from 'services/productApi';

const useApp = () => {
  const app = useSelector((state: RootState) => state.app);

  const { categories, isLoading, hideSideBar, brands } = app;
  const dispatch = useDispatch();
  const setIsLoading = (status: boolean) => {
    dispatch(changeLoadingStatus(status));
  };
  const fetchCategories = async () => {
    try {
      const res: ResponseType = await fetchAllCategories();
      if (res && res.success) {
        if (res.categories) {
          dispatch(setCategories(res?.categories));
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const setShowSideBar = (value: boolean) => {
    dispatch(setSidebar(value));
  };

  const getAllBrand = async () => {
    try {
      const res: ResponseType = await fetchAllBrands();
      if (res.success && res.brands) {
        dispatch(setBrands(res.brands));
      }
    } catch (error) {
      // console.log(error);
    }
  };

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
