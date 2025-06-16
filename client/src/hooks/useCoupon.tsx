import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCouponStore } from '@/store';

const useCoupon = () => {
  const {
    coupons: couponList,
    totalPages,
    currentPage,
    isLoading,
    error,
    fetchCoupons,
    searchCoupons,
    updateCouponStatus
  } = useCouponStore();

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  const getAllCoupon = async (page?: number, limit?: number) => {
    try {
      await fetchCoupons(page || 1, limit || 5);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching coupons';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const onUpdateCouponStatus = async (couponId: string, status: string) => {
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active';
      await updateCouponStatus(couponId, newStatus);
      enqueueSnackbar(
        `${newStatus === 'active' ? 'Activated' : 'Deactivated'} coupon successfully`,
        { variant: 'success' }
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating coupon status';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const searchCoupon = async (couponCode: string, page: number, limit: number) => {
    try {
      await searchCoupons(couponCode, page, limit);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error searching coupons';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return {
    getAllCoupon,
    couponList,
    totalPages,
    currentPage,
    isLoading,
    error,
    onUpdateCouponStatus,
    searchCoupon,
    page,
    setPage,
    limit,
    setLimit,
  };
};

export default useCoupon;
