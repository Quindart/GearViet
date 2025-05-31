import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
  updateCategory,
  updateSubcategory,
} from 'services/categoryApi';
import axiosConfig from 'services/axios-config';
import { RootState } from 'store';
import { setCategories, setSidebar } from 'store/slices/appSlice';
import { Categories, ResponseType } from 'types';
import { useSnackbar } from 'notistack';
interface CategoriesResponseType extends ResponseType {
  categories: [Categories];
}

const useCategory = () => {
  const categories = useSelector((state: RootState) => state.app.categories);
  const hideSideBar = useSelector((state: RootState) => state.app.hideSideBar);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const getCategories = async () => {
    try {
      const res: CategoriesResponseType = await axiosConfig.get('/category');
      if (res && res.success) {
        dispatch(setCategories(res.categories));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const success = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
    getCategories();
  };

  const onAddCategory = async (name: string) => {
    try {
      const res: ResponseType = await addCategory(name);
      if (res.success) {
        success('Tạo mới category thành công');
        return;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onAddSubcategory = async (categoryId: string, name: string) => {
    try {
      const res: ResponseType = await addSubCategory(categoryId, name);
      if (res.success) {
        success('Tạo mới sub category thành công');
        return;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onUpdateCategory = async (categoryId: string, name: string) => {
    try {
      const res: ResponseType = await updateCategory(categoryId, name);
      if (res.success) {
        success('Sửa category name thành công');
        return;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onUpdateSubcategory = async (subcategoryId: string, name: string) => {
    try {
      const res: ResponseType = await updateSubcategory(subcategoryId, name);
      if (res.success) {
        success('Sửa subcategory name thành công');
        return;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onDeleteCategory = async (categoryId: string) => {
    try {
      const res: ResponseType = await deleteCategory(categoryId);
      if (res.success) {
        success('Xóa category thành công');
        return;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const onDeleteSubcategory = async (subcategoryId: string) => {
    try {
      const res: ResponseType = await deleteSubCategory(subcategoryId);
      if (res.success) {
        success('Xóa sub category thành công');
        return;
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const setShowSideBar = (value: boolean) => {
    dispatch(setSidebar(value));
  };

  return {
    categories,
    hideSideBar,
    getCategories,
    setShowSideBar,
    onUpdateCategory,
    onDeleteCategory,
    onDeleteSubcategory,
    onAddCategory,
    onAddSubcategory,
    onUpdateSubcategory,
  };
};

export default useCategory;
