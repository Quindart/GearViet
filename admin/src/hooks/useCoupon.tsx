import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCouponStatus, fetchAllCoupon, searchCouponService } from 'services/couponApi';
import { RootState } from 'store';
import { setCouponList, setCouponRenderType, setTotalRows } from 'store/slices/couponSlice';
import { ResponseType } from 'types';
import { ICoupon } from 'types/coupon';
import { renderType } from 'utils/app-config';

const useCoupon = () => {
  const couponList = useSelector((state: RootState) => state.coupon.couponList);
  const totalRows = useSelector((state: RootState) => state.coupon.totalRows);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  const getAllCoupon = async (page?: number, limit?: number) => {
    dispatch(setCouponList([]));

    try {
      const res: ResponseType = await fetchAllCoupon(page, limit);
      if (res.success && res.coupon && res.totalRows) {
        const couponList = res.coupon;
        dispatch(setCouponList(couponList));
        dispatch(setTotalRows(res.totalRows));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Có lỗi khi tải dữ liệu, vui lòng thử lại sau!', {
          variant: 'error',
        });
      }
    }
  };

  const updateCouponStatus = async (couponId: string, status: string) => {
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active';
      const res: ResponseType = await changeCouponStatus(couponId, newStatus);
      if (res.success && res.newCoupon) {
        enqueueSnackbar(
          `${
            res.newCoupon.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'
          } mã giảm giá thành công`,
          {
            variant: 'success',
          },
        );
        const newCouponList: ICoupon[] = couponList.map((coupon: ICoupon) => {
          if (coupon._id === couponId) {
            return {
              ...coupon,
              status: res.newCoupon?.status as string,
            };
          } else {
            return coupon;
          }
        });
        dispatch(setCouponList(newCouponList));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        enqueueSnackbar('Vui lòng thử lại sau', {
          variant: 'error',
        });
      }
    }
  };

  const searchCoupon = async (couponCode: string, page: number, limit: number) => {
    const res: ResponseType = await searchCouponService(couponCode, page, limit);
    if (res.success) {
      dispatch(setCouponList(res.coupons as ICoupon[]));
      dispatch(setCouponRenderType(renderType.SEARCH));
      dispatch(setTotalRows(res.totalRows as number));
    }
  };

  return {
    getAllCoupon,
    couponList,
    totalRows,
    updateCouponStatus,
    searchCoupon,
    page,
    setPage,
    limit,
    setLimit,
  };
};

export default useCoupon;
