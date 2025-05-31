import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { IOrder, OrderProductsType } from 'types/order';
import Table from './../../../ui/Table/index';
import CustomProductTable from './style';
import { Link } from 'react-router-dom';
import { ProductDataType } from 'types/product';
type ProductTablePropType = {
  order: IOrder;
};

type CustomOrderProductType = {
  id: string;
  price: number;
  product: ProductDataType;
  quantity: number;
  rating: number;
  total: number;
  _id: string;
};

const ProductTable = (props: ProductTablePropType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const rows: CustomOrderProductType[] =
    props.order &&
    props.order?.products?.map((item: OrderProductsType) => ({
      ...item,
      price: item.product.price,
      id: item._id,
      rating: item.product.rating ? item.product.rating : 0,
      total: item.product.price * item.quantity,
    }));

  const columns: GridColDef[] = [
    {
      field: 'product',
      sortable: false,
      flex: 1,
      minWidth: 500,
      headerName: 'Product details',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'/products/' + params.value._id} className='flex gap-4 items-center'>
          <img src={params.value.images[0].url} className='w-16 h-16 bg-[rgba(243,246,249)]' />
          <Typography className='text-[15px] text-[#405189] font-medium'>
            {params.value.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: 'price',
      sortable: false,
      minWidth: 100,
      headerName: 'Item price',
    },
    {
      field: 'quantity',
      sortable: false,
      minWidth: 100,
      headerName: 'Quantity',
    },
    {
      field: 'rating',
      sortable: false,
      minWidth: 100,
      headerName: 'Rating',
    },
    {
      field: 'total',
      sortable: false,
      minWidth: 120,
      headerName: 'Total Amount',
    },
  ];

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    rows &&
      rows.forEach((item: CustomOrderProductType) => {
        totalPrice += item.total;
      });

    return totalPrice;
  };

  const calculateDiscount = () => {
    return props.order?.coupon
      ? (calculateTotalPrice() / 100) * props.order.coupon.discount
      : calculateTotalPrice() * 0;
  };

  const discount = calculateDiscount();
  const calculateFinalAmount = () => {
    return calculateTotalPrice() - discount;
  };

  const displayDiscountPercent = () => {
    return props.order.coupon?.discount ? props.order.coupon?.discount : 0;
  };
  return (
    <CustomProductTable>
      <Box className='p-4'>
        <Typography>Order {props.order?._id}</Typography>
      </Box>
      <Box className='flex items-end flex-col'>
        <Table
          onChangeRowsPerPage={() => {}}
          columns={columns}
          rows={rows ? rows : []}
          currentPage={currentPage}
          // total pages on pagination
          totalPage={4}
          // amount of items will be showed on table
          pageSize={5}
          onChangePage={onChangePage}
        />
        <Box className='w-[381px] p-4 '>
          <Box className='totalItem'>
            <Typography className='totalText'>Subtotal</Typography>
            <Typography className='totalText'>${calculateTotalPrice()}</Typography>
          </Box>
          <Box className='totalItem border-b border-[#e9ebec] border-dashed'>
            <Typography className='totalText'>Discount ({displayDiscountPercent()} %) :</Typography>
            <Typography className='totalText'>{`${
              discount !== 0 ? '-' : ''
            } ${discount}`}</Typography>
          </Box>
          <Box className='totalItem'>
            <Typography className='totalText'>Total</Typography>
            <Typography className='totalText'>${calculateFinalAmount()}</Typography>
          </Box>
        </Box>
      </Box>
    </CustomProductTable>
  );
};

export default ProductTable;
