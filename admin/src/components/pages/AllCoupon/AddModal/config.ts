import dayjs from 'dayjs';
import { CouponFormDataType } from 'types/coupon';
import * as yup from 'yup';

export const initialValues: CouponFormDataType = {
  code: '',
  discount: 0,
  available: 0,
  status: '',
  startDate: dayjs(),
  endDate: dayjs(),
};

export const validationSchema = yup.object().shape({
  code: yup
    .string()
    .min(2, 'Ít nhất là 2 ký tự')
    .max(8, 'Tối đa 8 ký tự!')
    .matches(/^[\w]+$/u, 'Mã code không thể bao gồm ký tự đặc biệt')
    .required('Vui lòng nhập code'),
  discount: yup
    .number()
    .min(1, 'Vui lòng nhập mã giảm giá lớn hơn 0')
    .max(100, 'Mã giảm giá tối đa là 100%')
    .required('Vui lòng nhập giá trị mã giảm giá'),
  available: yup
    .number()
    .typeError('Vui lòng nhập số lượng mã giảm giá')
    .min(1, 'Số lượng tồn kho  phải lớn hơn 0')
    .positive('Số lượng tồn kho phải lớn hơn 0')
    .required('Vui lòng nhập số lượng hàng trong tồn kho'),
  startDate: yup
    .date()
    .min(new Date(), 'Ngày bắt đầu phải lớn hơn ngày hiện tại')
    .required('Vui lòng chọn ngày bắt đầu'),
  endDate: yup
    .date()
    .when('startDate', (startDate: Date, schema: any) => {
      if (startDate) {
        const dayAfter = new Date(startDate.getTime() + 86400000);
        return schema.min(dayAfter, 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
      }
      return schema;
    })
    .required('Vui lòng chọn ngày kết thúc'),
  status: yup.string().required('Vui lòng chọn trạng thái của mã giảm giá'),
});
