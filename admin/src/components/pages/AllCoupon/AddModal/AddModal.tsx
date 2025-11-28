import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/ui/Button';
import Calendar from 'components/ui/Calendar';
import DropDown from 'components/ui/Dropdown';
import TextField from 'components/ui/TextField';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { addNewCoupon } from 'services/couponApi';
import { ResponseType } from 'types';
import { CouponFormDataType } from 'types/coupon';
import { LIST_STATUS } from 'utils/constants';
import { CustomModal } from '../style';
import { initialValues, validationSchema } from './config';
import dayjs, { Dayjs } from 'dayjs';
import useCoupon from 'hooks/useCoupon';

type EditModalTypes = {
  onClose?: () => void;
};
const AddModal = (props: EditModalTypes) => {
  const { t } = useTranslation();
  const { onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { getAllCoupon } = useCoupon();
  const formik: FormikProps<CouponFormDataType> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: CouponFormDataType, actions: FormikHelpers<CouponFormDataType>) => {
      const res: ResponseType = await addNewCoupon(values);

      if (!res.success) {
        enqueueSnackbar(res.message, { variant: 'error' });

        return;
      }
      enqueueSnackbar(t('pages/coupons:createCouponSuccess', { defaultValue: 'New coupon added successfully' }), {
        variant: 'success',
      });
      actions.resetForm({
        values: initialValues,
      });
      getAllCoupon();
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched, setFieldValue } = formik;
  const handleChangeDate = (newValue: Dayjs, fieldName: string) => {
    setFieldValue(fieldName, dayjs(newValue));
  };

  return (
    <CustomModal>
      <Box className='header'>
        <Typography>{t('pages/coupons:couponDetail', { defaultValue: 'Coupon Detail' })}</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} aria-label={t('shared/common:close', { defaultValue: 'Close' })} />
      </Box>
      <form className='content__bx' autoComplete='on' onSubmit={handleSubmit}>
        <TextField
          type='text'
          label={t('pages/coupons:couponCode', { defaultValue: 'Code' })}
          name='code'
          value={values.code}
          placeholder={t('pages/coupons:enterCouponCode', { defaultValue: 'Enter coupon code' })}
          error={touched.code && Boolean(errors.code)}
          helperText={touched.code && errors.code}
          id='code'
          onBlur={handleBlur}
          onChange={handleChange}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <TextField
          type='number'
          label={t('pages/coupons:discount', { defaultValue: 'Discount' })}
          name='discount'
          value={values.discount}
          placeholder={t('pages/coupons:enterDiscountPercentage', { defaultValue: 'Enter discount percentage' })}
          error={touched.discount && Boolean(errors.discount)}
          helperText={touched.discount && errors.discount}
          id='discount'
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextField
          type='number'
          label={t('pages/coupons:available', { defaultValue: 'Available' })}
          name='available'
          value={values.available}
          placeholder={t('pages/coupons:enterAvailableQuantity', { defaultValue: 'Enter available quantity' })}
          error={touched.available && Boolean(errors.available)}
          helperText={touched.available && errors.available}
          id='available'
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Calendar
          label={t('pages/coupons:startDate', { defaultValue: 'Start Date' })}
          value={values.startDate}
          onChange={(newValue: Dayjs) => handleChangeDate(newValue, 'startDate')}
          renderInput={(params: any) => (
            <TextField
              value={values.startDate}
              name='startDate'
              onBlur={handleBlur}
              error={touched.startDate && Boolean(errors.startDate)}
              helperText={touched.startDate && errors.startDate}
              {...params}
            />
          )}
        />
        <Calendar
          label={t('pages/coupons:endDate', { defaultValue: 'End Date' })}
          value={values.endDate}
          renderInput={(params: any) => (
            <TextField
              value={values.endDate}
              name='endDate'
              onBlur={handleBlur}
              error={touched.endDate && Boolean(errors.endDate)}
              helperText={touched.endDate && errors.endDate}
              {...params}
            />
          )}
          onChange={(newValue: Dayjs) => handleChangeDate(newValue, 'endDate')}
        />
        <Box>
          <DropDown
            name='status'
            label={t('pages/coupons:status', { defaultValue: 'Status' })}
            value={values.status}
            options={LIST_STATUS}
            placeholder={t('pages/coupons:changeCouponStatus', { defaultValue: 'Change coupon status' })}
            fullWidth
            error={touched.status && Boolean(errors.status)}
            helperText={touched.status ? errors.status : ''}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Box>

        <Box className='btn__bx'>
          <Button variant='contained' className='btn__close' onClick={onClose}>
            {t('shared/common:close', { defaultValue: 'Close' })}
          </Button>
          <Button variant='contained' className='btn--success' type='submit'>
            {t('shared/common:submit', { defaultValue: 'Submit' })}
          </Button>
        </Box>
      </form>
    </CustomModal>
  );
};
export default AddModal;
