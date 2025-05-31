import CustomProductDetail from './style';
import Gallery from './Gallery';
import { Box } from '@mui/material';
import Rating from './Rating';
import Review from './Review';
import Header from './Header';
import MainContent from './MainContent';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDataType } from 'types/product';
import { fetchProductById } from 'services/productApi';
import { ResponseType } from 'types';
import { useSnackbar } from 'notistack';
import { APP_ROUTES } from 'utils/app-config';
import { fetchTotalProductRevenue } from '../../../services/productApi';
import useReview from '../../../hooks/useReview';

const ProductDetailTemplate = () => {
  const [product, setProduct] = useState<ProductDataType>({} as ProductDataType);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const { getAllReviews, listAllReviews, reviewStats } = useReview();

  const getProductData = async () => {
    try {
      if (params.productId) {
        const response: ResponseType = await fetchProductById(params.productId);
        if (!response.success) navigate(APP_ROUTES.ALL_PRODUCT);
        if (response.product) setProduct(response.product);
        getAllReviews(response.product?._id as string);
      } else {
        navigate(APP_ROUTES.ALL_PRODUCT);
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      //         navigate(APP_ROUTES.ALL_PRODUCT);
    }
  };

  const getTotalProductRevenue = async () => {
    try {
      if (params.productId) {
        const response: ResponseType = await fetchTotalProductRevenue(params.productId);
        if (!response.success) navigate(APP_ROUTES.ALL_PRODUCT);
        if (response.totalRevenue) setTotalRevenue(response.totalRevenue);
      } else {
        navigate(APP_ROUTES.ALL_PRODUCT);
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      //         navigate(APP_ROUTES.ALL_PRODUCT);
    }
  };

  useEffect(() => {
    getProductData();
    getTotalProductRevenue();
  }, [params]);

  return (
    <CustomProductDetail>
      <Box className='main__bx xl:flex-row'>
        <Gallery product={product} />
        <Box className='grow'>
          <Header product={product} totalRevenue={totalRevenue} />
          <MainContent product={product} />
        </Box>
      </Box>
      <Box className='w-full 2xl:w-[calc(100%-540px)] xl:self-end flex flex-col lg:flex-row'>
        <Rating avg_review={product.avg_review as number} reviewStats={reviewStats} />
        <Review reviews={listAllReviews} />
      </Box>
    </CustomProductDetail>
  );
};

export default ProductDetailTemplate;
