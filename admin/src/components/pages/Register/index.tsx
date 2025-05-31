import { Icon } from '@iconify/react';
import { Box, InputAdornment, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';
import * as yup from 'yup';
import { APP_ROUTES } from 'utils/app-config';
import useUser from 'hooks/useUser';
import { RegisterValueType } from 'types/user';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(8, 'Confirm username should be of minimum 8 characters length')
    .required('Username is required'),
  password: yup
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
    .oneOf([yup.ref('password'), null], 'Confirm password must match with password'),
  email: yup.string().email().required('Email is required'),
});

const RegisterTemplate = () => {
  const navigate = useNavigate();
  const { handleRegister } = useUser();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPasword, setIsShowConfirmPasword] = useState<boolean>(false);
  const initialValue: RegisterValueType = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  return (
    <>
      <section className='container z-40'>
        <Box component='section' className='text-center'>
          <Typography
            component='h5'
            variant='h5'
            sx={{ color: theme.primary, mb: 2, fontSize: '16px', fontWeight: '600' }}
          >
            Create New Account
          </Typography>
          <Typography variant='subtitle1' className='text-sm' sx={{ color: theme.text_sub_rubric }}>
            Get your free account now
          </Typography>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={async (
              values: RegisterValueType,
              actions: FormikHelpers<RegisterValueType>,
            ) => {
              const result = await handleRegister(values);

              if (!result) {
                actions.resetForm();
                return;
              }
              navigate(APP_ROUTES.SUCCESS_MESSAGE);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }: FormikProps<RegisterValueType>) => (
              <form className='mt-6 p-2' onSubmit={handleSubmit}>
                <section className='fields'>
                  <TextField
                    label='Username'
                    id='username_input'
                    name='username'
                    placeholder='Enter username address'
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </section>
                <section className='fields'>
                  <TextField
                    label='Email'
                    id='email_input'
                    name='email'
                    placeholder='Enter email address'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </section>
                <section className='fields'>
                  <TextField
                    label='Password'
                    id='password_input'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    placeholder='Enter password'
                    type={isShowPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          onClick={() => {
                            setIsShowPassword(!isShowPassword);
                          }}
                        >
                          {isShowPassword ? (
                            <Icon icon='ic:baseline-remove-red-eye' />
                          ) : (
                            <Icon icon='mdi:eye-off' />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </section>
                <section className='fields'>
                  <TextField
                    inputProps={{ label: 'Confirm password' }}
                    label='Confirm Password'
                    id='confirm_password_input'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    placeholder='Enter confirm password'
                    type={isShowConfirmPasword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          onClick={() => {
                            setIsShowConfirmPasword(!isShowConfirmPasword);
                          }}
                        >
                          {isShowConfirmPasword ? (
                            <Icon icon='ic:baseline-remove-red-eye' />
                          ) : (
                            <Icon icon='mdi:eye-off' />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </section>

                <Button className='btn--success w-full' variant='contained' type='submit'>
                  Sign Up
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </section>
      <Typography sx={{ mt: 6, fontSize: '14px' }}>
        Already have an account ?{' '}
        <span
          className='underline inline text-sm font-bold cursor-pointer'
          onClick={() => navigate(APP_ROUTES.LOGIN)}
        >
          Signin
        </span>
      </Typography>
    </>
  );
};

export default RegisterTemplate;
