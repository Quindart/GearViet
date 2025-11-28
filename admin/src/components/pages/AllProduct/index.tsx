import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from 'components/ui/Button';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useProduct from './../../../hooks/useProduct';
import Filter from './Filter';
import CustomProduct from './style';
import Table from './../../ui/Table/index';
import Modal from 'components/ui/Modal';
import { useNavigate } from 'react-router-dom';
import ReviewModal from './Modal/ReviewModal';
import CommentModal from './Modal/CommentModal';
import { formatProductList } from 'utils/helper';
import { APP_ROUTES, renderType } from 'utils/app-config';
import AlertDialog from 'components/ui/AlertDialog';
import { ProductDataType } from 'types/product';
import DropDown from 'components/ui/Dropdown';
import { SelectChangeEvent } from '@mui/material/Select';
import { KeywordForSearchingProduct } from 'utils/constants';
import SearchBox from 'components/ui/SearchBox';
import { KeywordSearchEnum } from 'types/enum';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

enum AllProductModalContentEnum {
  COMMENT,
  REVIEW,
  ALERT,
}

type AllProductModalType = {
  open: boolean;
  content: AllProductModalContentEnum;
  product: ProductDataType;
};

const AllProductTemplate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchTextRef = useRef<HTMLInputElement | null>(null);
  const productRenderType = useSelector((state: RootState) => state.product.productRenderType);
  const filterParams = useSelector((state: RootState) => state.product.filterParams);
  const [keyword, setKeyWord] = useState<string>(KeywordSearchEnum.CODE);
  const [modal, setModal] = useState<AllProductModalType>({
    open: false,
    content: AllProductModalContentEnum.COMMENT,
    product: {} as ProductDataType,
  });
  const {
    productList,
    totalRows,
    getAllProduct,
    updateProductStatus,
    searchProduct,
    page,
    setPage,
    limit,
    setLimit,
    filterProduct,
  } = useProduct();

  useEffect(() => {
    if (productRenderType === renderType.ALL) {
      getAllProduct(page, limit);
    } else if (productRenderType === renderType.SEARCH) {
      handleSearchProduct();
    } else if (productRenderType === renderType.FILTER) {
      filterProduct(filterParams);
    }
  }, [page, limit, filterParams]);
  const rows = formatProductList(productList);

  const moveToProductDetail = (productId: string) => {
    navigate('/products/' + productId);
  };

  const handleChangeSearchKeyword = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value as string;
    if (value === KeywordSearchEnum.ALL && keyword !== KeywordSearchEnum.ALL) {
      getAllProduct(page, limit);
      setKeyWord(value);
      if (searchTextRef.current) {
        searchTextRef.current.value = '';
      }
      return;
    }
    setKeyWord(value);
  };

  const handleOpenModal = (content: AllProductModalContentEnum, product: ProductDataType) => {
    if (!product) product = {} as ProductDataType;
    setModal({
      content,
      open: true,
      product,
    });
  };

  const handleChangeLimitPerPage = (currentLimit: number) => {
    if (limit === currentLimit) return;
    setLimit(currentLimit);
  };

  const handleChangePage = (currentPage: number) => {
    if (page === currentPage) return;
    setPage(currentPage);
  };

  const handleCloseModal = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  const handleSearchProduct = () => {
    const content = searchTextRef.current?.value;
    if ((content === '' || keyword === KeywordSearchEnum.ALL) && productList.length < 2) {
      getAllProduct(page, limit);
      if (searchTextRef.current) {
        searchTextRef.current.value = '';
      }
      return;
    }
    if (content && keyword !== KeywordSearchEnum.ALL) {
      searchProduct(keyword, content);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'product',
      sortable: false,
      flex: 1,
      minWidth: 300,
      headerName: t('pages/products:productDetails', { defaultValue: 'Product details' }),
      renderCell: (params: GridRenderCellParams) => (
        <Box
          className='flex cursor-pointer'
          title='Ấn để xem chi tiết sản phẩm'
          onClick={() => moveToProductDetail(params.row._id)}
        >
          <img
            src={params.value.url}
            className='w-[40px] h-[40px] bg-[rgba(243,246,249)] round-sm'
          />
          <Box className='flex-1 ml-2 overflow-hidden'>
            <Typography
              title={params.value.name}
              className='text-[14px] text-[#212529] font-medium truncate  '
            >
              {params.value.name}
            </Typography>
            <Typography className='text-[13px] text-[#878A99] font-medium'>
              {t('pages/products:category', { defaultValue: 'Category' })}: {params.value.subcategory}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'price',
      sortable: false,
      width: 80,
      headerName: t('pages/products:price', { defaultValue: 'Price' }),
    },
    {
      field: 'code',
      sortable: false,
      width: 120,
      headerName: t('pages/products:productCode', { defaultValue: 'Code' }),
      renderCell: (params: GridRenderCellParams) => (
        <Typography className='text-[13px] capitalize'>{params.value.toUpperCase()}</Typography>
      ),
    },
    {
      field: 'available',
      sortable: false,
      width: 100,
      headerName: t('pages/products:stock', { defaultValue: 'Stock' }),
    },
    {
      field: 'brand',
      sortable: false,
      width: 100,
      headerName: t('pages/products:brand', { defaultValue: 'Brand' }),
      renderCell: (params: GridRenderCellParams) => (
        <Typography className='text-[13px] capitalize'>{params.value}</Typography>
      ),
    },
    {
      field: 'totalComment',
      sortable: false,
      maxWidth: 100,
      headerName: t('pages/products:comment', { defaultValue: 'Comment' }),
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          className='cursor-pointer text-[13px] text-[#405189] m-auto'
          onClick={() => handleOpenModal(AllProductModalContentEnum.COMMENT, params.row)}
        >
          {params.value ? params.value : 0}
        </Typography>
      ),
    },
    {
      field: 'avg_review',
      sortable: false,
      width: 100,
      headerName: t('pages/products:rating', { defaultValue: 'Rating' }),
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          className='cursor-pointer text-[13px] text-[#405189] m-auto'
          onClick={() => handleOpenModal(AllProductModalContentEnum.REVIEW, params.row)}
        >
          {params.value ? params.value.toFixed(1) : 0}
        </Typography>
      ),
    },
    {
      field: 'status',
      sortable: false,
      width: 100,
      align: 'center',
      headerName: t('pages/products:status', { defaultValue: 'Status' }),
      renderCell: (params: GridRenderCellParams) => (
        <Box
          className={`w-full p-1 rounded-md text-center cursor-pointer ${
            params.value === 'active' ? 'bg-[rgba(10,179,156,.1)]' : 'bg-[rgba(240,101,72,.1)]'
          }`}
          onClick={() => handleOpenModal(AllProductModalContentEnum.ALERT, params.row)}
        >
          <Typography
            className={`${
              params.value === 'active' ? 'text-[#0ab39c]' : 'text-[#F06548]'
            } text-[9.75px] capitalize`}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: t('shared/common:actions', { defaultValue: 'Actions' }),
      width: 100,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Box className='flex gap-4'>
          <span title='Product detail' onClick={() => moveToProductDetail(params.row._id)}>
            <Icon icon='ri:eye-fill' className='text-[#405189] cursor-pointer text-lg' />
          </span>
          <span
            title='Edit product'
            onClick={() => {
              navigate(APP_ROUTES.EDIT_PRODUCT, { state: params.row._id });
            }}
          >
            <Icon icon='ri:pencil-fill' className='text-[#405189] cursor-pointer text-lg' />
          </span>
        </Box>
      ),
      sortable: false,
    },
  ];

  // console.log(page);

  return (
    <CustomProduct className='xl:flex-row'>
      <Box className='filterBx xl:max-w-[300px]  2xl:max-w-[320px]'>
        <Filter />
      </Box>
      <Box className='tableBx'>
        <Box className='p-2 flex justify-between items-center flex-wrap'>
          <Button
            className='btn--success '
            variant='contained'
            onClick={() => navigate('/products/new')}
          >
            {t('pages/products:addNew', { defaultValue: 'Add product' })}
          </Button>
          <Box className='w-full flex mt-2 gap-1'>
            <SearchBox
              inputRef={searchTextRef}
              placeholder={t('pages/products:searchPlaceholder', { defaultValue: 'Search for product code or product name' })}
            />
            <DropDown
              options={KeywordForSearchingProduct}
              value={keyword}
              onChange={handleChangeSearchKeyword}
            />
            <Button variant='contained' onClick={handleSearchProduct}>
              {t('shared/common:search', { defaultValue: 'Search' })}
            </Button>
          </Box>
        </Box>
        <Box>
          {productList.length > 0 ? (
            <Table
              columns={columns}
              rows={rows}
              currentPage={page}
              pageSize={limit}
              totalPage={Math.ceil(totalRows / limit)}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeLimitPerPage}
              hasCheckbox
              hasPagination
            />
          ) : (
            <Typography className='text-center py-4'>{t('pages/products:noProduct', { defaultValue: 'No product here' })}</Typography>
          )}
        </Box>
      </Box>

      <Modal open={modal.open} onClose={handleCloseModal}>
        {modal.content === AllProductModalContentEnum.COMMENT && (
          <CommentModal onClose={handleCloseModal} id={modal.product._id} />
        )}
        {modal.content === AllProductModalContentEnum.REVIEW && (
          <ReviewModal onClose={handleCloseModal} id={modal.product._id} />
        )}
      </Modal>

      <AlertDialog
        open={modal.open && modal.content === AllProductModalContentEnum.ALERT}
        onClose={handleCloseModal}
        onChange={() => {
          updateProductStatus(modal.product._id);
          handleCloseModal();
        }}
        message={modal.product.status === 'active'
          ? t('pages/products:deactivateProduct', { defaultValue: 'Are you sure you want to deactivate this product?' })
          : t('pages/products:activateProduct', { defaultValue: 'Are you sure you want to activate this product?' })}
      />
    </CustomProduct>
  );
};

export default AllProductTemplate;
