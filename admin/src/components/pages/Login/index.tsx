import { Icon } from '@iconify/react';
import { Box, Checkbox, FormControlLabel, InputAdornment, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';
import * as yup from 'yup';
import { APP_ROUTES } from 'utils/app-config';
import useUser from 'hooks/useUser';
import { LoginValuesType } from 'types/user';

const validationSchema = yup.object({
  username: yup.string().min(8, 'Confirm username should be of minimum 8 characters length'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 1 upper letter, 1 lower letter, 1 number, 1 special character',
    ),
});

const LoginTemplate = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { handleLogin } = useUser();

  const initialValue: LoginValuesType = {
    username: '',
    password: '',
    remember: false,
  };
  return (
    <>
      <section className='container z-40'>
        <Box component='section' className='text-center' maxWidth='xs'>
          <Typography
            component='h5'
            variant='h5'
            sx={{ color: theme.primary, mb: 2, fontSize: '16px', fontWeight: '600' }}
          >
            Welcome Back !
          </Typography>
          <Typography variant='subtitle1' className='text-sm' sx={{ color: theme.text_sub_rubric }}>
            Sign in to continue.
          </Typography>

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={async (values: LoginValuesType, actions: FormikHelpers<LoginValuesType>) => {
              const result = await handleLogin(values);
              if (!result) {
                actions.resetForm();
                return;
              }
              navigate({
                pathname: APP_ROUTES.INDEX,
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }: FormikProps<LoginValuesType>) => (
              <form className='mt-6 p-2' onSubmit={handleSubmit} autoComplete='on'>
                <section className='fields'>
                  <TextField
                    autoComplete='username LoginValuesType'
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

                <section className='fields '>
                  <TextField
                    autoComplete='password '
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
                <section className='fields flex justify-between items-center'>
                  <FormControlLabel
                    control={
                      <Checkbox name='remember' checked={values.remember} onChange={handleChange} />
                    }
                    label={
                      <Typography className='fields__label mb-0 font-normal'>
                        Remember me
                      </Typography>
                    }
                  />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: theme.text_gray,
                      '&:hover': {
                        color: theme.primary,
                      },
                    }}
                  >
                    <span
                      className=' text-sm  cursor-pointer '
                      onClick={() => navigate(APP_ROUTES.FORGOT_PASSWORD)}
                    >
                      Forgot password?
                    </span>
                  </Typography>
                </section>
                <Button className='btn--success w-full' variant='contained' type='submit'>
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </section>
      <Typography sx={{ mt: 6, fontSize: '14px' }}>
        Don't have an LoginValuesType ?{' '}
        <span
          className='underline inline text-sm font-bold cursor-pointer'
          onClick={() => navigate(APP_ROUTES.REGISTER)}
        >
          Sign up
        </span>
      </Typography>
    </>
  );
};

export default LoginTemplate;
