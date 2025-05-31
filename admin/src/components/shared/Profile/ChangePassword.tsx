import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from 'services/userApi';
import { setAdminDetail } from 'store/slices/userSlice';
import { ResponseType } from 'types';
import { setValueInLocalStorage } from 'utils/helper';
import * as yup from 'yup';
import { CustomChangePassword } from './style';

type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const validationSchema = yup.object({
  currentPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 1 upper letter, 1 lower letter, 1 number, 1 special character',
    ),
  newPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 1 upper letter, 1 lower letter, 1 number, 1 special character',
    ),
  confirmPassword: yup
    .string()
    .min(8, 'Confirm password should be of minimum 8 characters length')
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Confirm password must match with new password'),
});
const initialValues: ChangePasswordType = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
type ChangePasswordPropsTypes = {
  onClose: () => void;
};
const ChangePassword = (props: ChangePasswordPropsTypes) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik: FormikProps<ChangePasswordType> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: ChangePasswordType, actions: FormikHelpers<ChangePasswordType>) => {
      const { currentPassword, newPassword, confirmPassword } = values;
      const res: ResponseType = await changePassword(currentPassword, newPassword, confirmPassword);
      if (res.success) {
        enqueueSnackbar('Đổi mật khẩu thành công', { variant: 'success' });
        actions.resetForm();
        dispatch(setAdminDetail(null));
        setValueInLocalStorage('access_token', '');
        props.onClose();
        navigate('auth/login');
        return;
      }
      enqueueSnackbar(res.message, { variant: 'error' });
    },
  });
  const toggleShowPassword = () => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  return (
    <CustomChangePassword>
      <form onSubmit={handleSubmit} autoComplete='on'>
        <Box className='item__bx'>
          <TextField
            label='Current password'
            name='currentPassword'
            onChange={handleChange}
            error={touched.currentPassword && Boolean(errors.currentPassword)}
            helperText={touched.currentPassword && errors.currentPassword}
            value={values.currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' onClick={toggleShowPassword}>
                  {showPassword ? (
                    <Icon icon='mdi:eye-off' />
                  ) : (
                    <Icon icon='ic:baseline-remove-red-eye' />
                  )}
                </InputAdornment>
              ),
            }}
            type={showPassword ? 'text' : 'password'}
          />
        </Box>
        <Box className='item__bx'>
          <TextField
            name='newPassword'
            value={values.newPassword}
            onChange={handleChange}
            error={touched.newPassword && Boolean(errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
            label='New password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' onClick={toggleShowPassword}>
                  {showPassword ? (
                    <Icon icon='mdi:eye-off' />
                  ) : (
                    <Icon icon='ic:baseline-remove-red-eye' />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className='item__bx'>
          <TextField
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            label='Confirm new password'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' onClick={toggleShowPassword}>
                  {showPassword ? (
                    <Icon icon='mdi:eye-off' />
                  ) : (
                    <Icon icon='ic:baseline-remove-red-eye' />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={props.onClose}>Close</Button>
          <Button type='submit' variant='contained' className='btn--success'>
            Save
          </Button>
        </Box>
      </form>
    </CustomChangePassword>
  );
};

export default ChangePassword;
