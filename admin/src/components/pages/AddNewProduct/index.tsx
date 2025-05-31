import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
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
    <CustomInfoGroupWrapper component='section' className='bg-white rounded mb-4  shadow-sm w-full'>
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
      if (!values.code) {
        enqueueSnackbar('Chưa có mã sản phẩm', { variant: 'warning' });
        return;
      }
      let res: ResponseType;
      if (location.state) {
        res = await editProduct(location.state, values);
      } else {
        res = await addNewProduct(values);
      }
      if (!res.success) {
        enqueueSnackbar(res.message, { variant: 'error' });
        return;
      }
      if (location.state) {
        editProductDetailSuccess();
      } else {
        createNewProductSuccess();
      }
      actions.resetForm({
        values: initialValues,
      });
      navigate(APP_ROUTES.ALL_PRODUCT);
    },
  });

  function editProductDetailSuccess() {
    enqueueSnackbar('Thay đổi thông tin sản phẩm thành công', {
      variant: 'success',
    });
  }
  function createNewProductSuccess() {
    enqueueSnackbar('Thêm sản phẩm mới thành công', {
      variant: 'success',
    });
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
  } = formik;
  React.useEffect(() => {
    if (location.state && productList.length > 0) {
      const newValues = productList.find(
        (product: ProductDataType) => product._id === location.state,
      );
      if (newValues) {
        const currentCategory = categories.find((category: Categories) => {
          const result = category?.subcategory.some(
            (subcategory: Subcategory) => subcategory?._id === newValues?.subcategory?._id,
          );
          return result === true;
        });
        const currentSubcategory =
          currentCategory &&
          currentCategory.subcategory.find(
            (subcategory: Subcategory) => subcategory._id === newValues?.subcategory?._id,
          );

        resetForm({
          values: {
            ...newValues,
            category: currentCategory ? currentCategory?._id : '',
            subcategory: currentSubcategory ? currentSubcategory._id : '',
          },
        });
        return;
      }
    } else {
      navigate(APP_ROUTES.ADD_NEW);
    }
  }, []);
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

          <aside className='w-full lg:w-1/3 '>
            <GeneralInfo />
            <Category setOpenModal={setOpenModal} />
            {/* TODO: Move tags to tags component */}
            <InfoGroupWrapper heading='Product Tags'>
              <Tags />
            </InfoGroupWrapper>
            <InfoGroupWrapper heading='Product Size'>
              <Size />
            </InfoGroupWrapper>
          </aside>
          <aside className='w-full lg:w-2/3 lg:pr-4'>
            <Button className='btn--success ' variant='contained' type='submit'>
              {location.state ? 'Edit' : 'Submit'}
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
