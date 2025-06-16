import { useSnackbar } from 'notistack';
import { useCategoryStore } from '@/store';

const useCategory = () => {
  const {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
  } = useCategoryStore();

  const { enqueueSnackbar } = useSnackbar();

  const getCategories = async () => {
    try {
      await fetchCategories();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching categories';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onAddCategory = async (name: string) => {
    try {
      await addCategory(name);
      enqueueSnackbar('Category created successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating category';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onAddSubcategory = async (categoryId: string, name: string) => {
    try {
      await addSubcategory(categoryId, name);
      enqueueSnackbar('Subcategory created successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error creating subcategory';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onUpdateCategory = async (categoryId: string, name: string) => {
    try {
      await updateCategory(categoryId, name);
      enqueueSnackbar('Category updated successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating category';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onUpdateSubcategory = async (subcategoryId: string, name: string) => {
    try {
      await updateSubcategory(subcategoryId, name);
      enqueueSnackbar('Subcategory updated successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating subcategory';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      enqueueSnackbar('Category deleted successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting category';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onDeleteSubcategory = async (subcategoryId: string) => {
    try {
      await deleteSubcategory(subcategoryId);
      enqueueSnackbar('Subcategory deleted successfully', { variant: 'success' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting subcategory';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return {
    categories,
    isLoading,
    error,
    getCategories,
    onUpdateCategory,
    onDeleteCategory,
    onDeleteSubcategory,
    onAddCategory,
    onAddSubcategory,
    onUpdateSubcategory,
  };
};

export default useCategory;
