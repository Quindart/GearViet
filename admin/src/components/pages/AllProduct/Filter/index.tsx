import { Box, Link, Typography } from '@mui/material';
// import Tag from 'components/ui/Tag';
import Brand from './Brand';
import Category from './Category';
import Rating from './Rating';
import CustomFilter from './style';
// import useProduct from 'hooks/useProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setFilterParams, setProductRenderType } from 'store/slices/productSlice';
import { renderType } from 'utils/app-config';

const Filter = () => {
  const dispatch = useDispatch();
  const filterParams = useSelector((state: RootState) => state.product.filterParams);

  const handleBrandChange = (brand: string) => {
    if (filterParams.brand.includes(brand)) {
      const result = filterParams.brand.filter((item: string) => item !== brand);
      console.log(result);
      dispatch(setFilterParams({ ...filterParams, brand: result }));
      dispatch(setProductRenderType(renderType.FILTER));
    } else {
      const result = [...filterParams.brand];
      result.push(brand);

      console.log(result);
      dispatch(setFilterParams({ ...filterParams, brand: result }));
      dispatch(setProductRenderType(renderType.FILTER));
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = e.target.value;
    dispatch(setProductRenderType(renderType.FILTER));
    dispatch(setFilterParams({ ...filterParams, rating: parseInt(rating) }));
  };

  return (
    <CustomFilter>
      <Box className='header'>
        <Box className='flex items-center justify-between'>
          <Typography>Filters</Typography>
          <Link
            className='text-[13px] text-[#405189] decoration-[#405189] cursor-pointer'
            onClick={() => {
              dispatch(setProductRenderType(renderType.ALL));
              dispatch(setFilterParams({ subCategoryId: '', brand: [], discount: 0, rating: 0 }));
            }}
          >
            Clear all
          </Link>
        </Box>
      </Box>
      <Box>
        <Category
          onItemClick={(subcategoryId: string) => {
            dispatch(setProductRenderType(renderType.FILTER));
            dispatch(setFilterParams({ ...filterParams, subCategoryId: subcategoryId }));
          }}
          selectedCategory={filterParams.subCategoryId}
        />
        <Brand onItemClick={handleBrandChange} brandCheckedList={filterParams.brand} />

        {/* <Discount /> */}
        <Rating onChange={handleRatingChange} activeItem={filterParams.rating} />
      </Box>
    </CustomFilter>
  );
};

export default Filter;
