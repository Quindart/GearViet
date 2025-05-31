import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/ui/Button';
import Calendar from 'components/ui/Calendar';
import DropDown from 'components/ui/Dropdown';
import TextField from 'components/ui/TextField';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
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
      enqueueSnackbar('Thêm mã giảm giá mới thành công', {
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
        <Typography>Coupon Detail</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>
      <form className='content__bx' autoComplete='on' onSubmit={handleSubmit}>
        <TextField
          type='text'
          label='Code'
          name='code'
          value={values.code}
          placeholder='Nhập mã giảm giá'
          error={touched.code && Boolean(errors.code)}
          helperText={touched.code && errors.code}
          id='code'
          onBlur={handleBlur}
          onChange={handleChange}
          inputProps={{ style: { textTransform: 'uppercase' } }}
        />
        <TextField
          type='number'
          label='Discount'
          name='discount'
          value={values.discount}
          placeholder='Nhập giá trị mã giảm giá'
          error={touched.discount && Boolean(errors.discount)}
          helperText={touched.discount && errors.discount}
          id='discount'
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextField
          type='number'
          label='Available'
          name='available'
          value={values.available}
          placeholder='Nhập giá trị mã giảm giá'
          error={touched.available && Boolean(errors.available)}
          helperText={touched.available && errors.available}
          id='available'
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Calendar
          label='Start Date'
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
          label='End Date'
          value={values.endDate}
          renderInput={(params: any) => (
            <TextField
              value={values.startDate}
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
            label='Status'
            value={values.status}
            options={LIST_STATUS}
            placeholder='Thay đổi trạng thái của mã sản phẩm'
            fullWidth
            error={touched.status && Boolean(errors.status)}
            helperText={touched.status ? errors.status : ''}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Box>

        <Box className='btn__bx'>
          <Button variant='contained' className='btn__close' onClick={onClose}>
            Close
          </Button>
          <Button variant='contained' className='btn--success' type='submit'>
            Update
          </Button>
        </Box>
      </form>
    </CustomModal>
  );
};
export default AddModal;
