import { Box, Card, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import  { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { addNewProduct, editProduct } from 'services/productApi';
import { Categories, ResponseType, Subcategory } from 'types';
import AddNewCategory from './components/AddNewCategory';
import Category from './components/Category';
import Content from './components/Content';
import Gallery1 from './components/Gallery';
import GeneralInfo from './components/GeneralInfo';
import Tags from './components/Tags';
import NewProductContext from './Context';
import CustomInfoGroupWrapper from './style';
import { ProductDataType, ProductFormDataType } from 'types/product';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_ROUTES } from 'utils/app-config';
import useProduct from 'hooks/useProduct';
import useApp from 'hooks/useApp';
import { validationSchema, initialValues, InfoGroupWrapperPropsType } from './config';
import Size from './components/Size';

export function InfoGroupWrapper(props: InfoGroupWrapperPropsType) {
  return (
    <CustomInfoGroupWrapper component='section' className='bg-white rounded mb-4 shadow-sm w-full'>
      {props.heading && (
        <Typography component='p' variant='caption' className='heading'>
          {props.heading}
        </Typography>
      )}
      <div className='p-4'>{props.children}</div>
    </CustomInfoGroupWrapper>
  );
}

const AddNewProductTemplate = () => {
  const { t } = useTranslation();
  const [open, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useApp();
  const { productList } = useProduct();

  const formik: FormikProps<ProductFormDataType> = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values: ProductFormDataType, actions: FormikHelpers<ProductFormDataType>) => {
      console.log("🚀 ~ AddNewProductTemplate ~ values:", values);
      
      // Kiểm tra product code
      if (!values.code) {
        enqueueSnackbar(t('pages/products:noProductCode', { defaultValue: 'No product code yet' }), { 
          variant: 'warning' 
        });
        return;
      }

      try {
        let res: ResponseType;
        
        // Edit hoặc Add product
        if (location.state) {
          res = await editProduct(location.state, values);
        } else {
          res = await addNewProduct(values);
        }

        // Xử lý response
        if (!res.success) {
          enqueueSnackbar(res.message, { variant: 'error' });
          return;
        }

        // Thành công
        if (location.state) {
          editProductDetailSuccess();
        } else {
          createNewProductSuccess();
        }

        // Reset form
        actions.resetForm({
          values: initialValues,
        });

        // Navigate về trang danh sách
        navigate(APP_ROUTES.ALL_PRODUCT);
      } catch (error) {
        console.error('Submit error:', error);
        enqueueSnackbar(t('pages/products:submitError', { defaultValue: 'An error occurred' }), { 
          variant: 'error' 
        });
      }
    },
  });

  function editProductDetailSuccess() {
    enqueueSnackbar(
      t('pages/products:editProductSuccess', { defaultValue: 'Product information updated successfully' }), 
      { variant: 'success' }
    );
  }

  function createNewProductSuccess() {
    enqueueSnackbar(
      t('pages/products:createProductSuccess', { defaultValue: 'New product added successfully' }), 
      { variant: 'success' }
    );
  }

  const {
    values,
    setFieldValue,
    setFieldError,
    handleSubmit,
    setTouched,
    handleChange,
    handleBlur,
    resetForm,
    errors,
    touched,
    isSubmitting,
  } = formik;

  // FIX: Thêm dependencies array và sửa logic
  useEffect(() => {
    // Chỉ load data khi ở chế độ edit
    if (location.state && productList.length > 0) {
      const newValues = productList.find(
        (product: ProductDataType) => product._id === location.state,
      );
      
      if (newValues) {
        const currentCategory = categories.find((category: Categories) => {
          return category?.subcategory.some(
            (subcategory: Subcategory) => subcategory?._id === newValues?.subcategory?._id,
          );
        });
        
        const currentSubcategory = currentCategory?.subcategory.find(
          (subcategory: Subcategory) => subcategory._id === newValues?.subcategory?._id,
        );

        resetForm({
          values: {
            ...newValues,
            category: currentCategory?._id || '',
            subcategory: currentSubcategory?._id || '',
          },
        });
      }
    }
  }, [location.state, productList, categories]); // Thêm dependencies
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Validation Errors:', errors);
    }
  }, [errors]);

  return (
    <>
      <Box component='form' className='flex flex-wrap py-4' onSubmit={handleSubmit}>
        <NewProductContext.Provider
          value={{
            touched,
            errors,
            values,
            setFieldValue,
            setTouched,
            handleChange,
            setFieldError,
            handleBlur,
          }}
        >
          <aside className='w-full lg:w-2/3 mr-0 lg:pr-4'>
            <Content />
            <Gallery1 />
          </aside>

          <aside className='w-full lg:w-1/3'>
            <GeneralInfo />
            <Category setOpenModal={setOpenModal} />
            
            <InfoGroupWrapper heading={t('pages/products:productTags', { defaultValue: 'Product Tags' })}>
              <Tags />
            </InfoGroupWrapper>
            
            <InfoGroupWrapper heading={t('pages/products:productSize', { defaultValue: 'Product Size' })}>
              <Size />
            </InfoGroupWrapper>
             {Object.keys(errors).length > 0 && (
              <Card className='mt-2 p-2 bg-white text-red-600 text-sm'>
                <Typography variant='caption'>
                  {t('pages/products:validationErrors', { defaultValue: 'Please fix the following errors:' })}
                </Typography>
                <ul className='list-disc pl-4'>
                  {Object.entries(errors).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                  ))}
                </ul>
              </Card>
            )}
          </aside>

          <aside className='w-full lg:w-2/3 lg:pr-4'>
          
            <Button 
              className='btn--success' 
              variant='contained' 
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? t('pages/products:submitting', { defaultValue: 'Submitting...' })
                : location.state 
                  ? t('pages/products:edit', { defaultValue: 'Edit' }) 
                  : t('pages/products:submit', { defaultValue: 'Submit' })
              }
            </Button>
            
           
          </aside>
        </NewProductContext.Provider>
      </Box>

      <Modal open={open} onClose={() => setOpenModal(false)}>
        <AddNewCategory />
      </Modal>
    </>
  );
};

export default AddNewProductTemplate;