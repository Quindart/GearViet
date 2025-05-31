import { Alert, Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';
import auth_forgot_icon from '../../../assets/images/auth-forgot-icon.png';
import * as yup from 'yup';
import { ResponseType } from 'types';
import { ForgotPasswordFormDataType } from 'types/user';
import { sendMailToResetPassword } from 'services/appApi';
import { useSnackbar } from 'notistack';

const validationSchema = yup.object({
  email: yup.string().email('Please enter email').required('Email is required'),
  username: yup.string().required('Username is required'),
});

const ForgotPasswordTemplate = () => {
  const navigate = useNavigate();
  const initialValue: ForgotPasswordFormDataType = {
    email: '',
    username: '',
  };
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <section className='container z-40'>
        <Box component='section' className='text-center' maxWidth='xs'>
          <Typography
            component='h5'
            variant='h5'
            sx={{ color: theme.primary, mb: 2, fontSize: '16px', fontWeight: '600' }}
          >
            Forgot Password?
          </Typography>
          <Typography variant='subtitle1' className='text-sm' sx={{ color: theme.text_sub_rubric }}>
            Reset password with NeKeTech
          </Typography>
          <div className='flex justify-center'>
            <img src={auth_forgot_icon} className='w-20 my-3 ' />
          </div>
          <Alert icon={false} className='text-center' severity='warning'>
            Enter your email and instructions will be sent to you!
          </Alert>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={(
              values: ForgotPasswordFormDataType,
              actions: FormikHelpers<ForgotPasswordFormDataType>,
            ) => {
              sendMailToResetPassword(values)
                .then((res: ResponseType) => {
                  if (res.success) {
                    enqueueSnackbar(res.message, { variant: 'success' });
                    navigate('/auth/successmessage');
                    return;
                  }
                })
                .catch((error: any) => {
                  enqueueSnackbar(error.message, { variant: 'error' });
                  actions.resetForm();
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }: FormikProps<ForgotPasswordFormDataType>) => (
              <form className='mt-6 p-2' onSubmit={handleSubmit}>
                <section className='mb-4 text-left'>
                  <TextField
                    required
                    label='Username'
                    id='username'
                    name='username'
                    placeholder='Enter username'
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </section>
                <section className='mb-4 text-left'>
                  <TextField
                    required
                    label='Email'
                    id='email_input'
                    name='email'
                    placeholder='Enter email address'
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </section>
                <Button className='btn--success w-full' variant='contained' type='submit'>
                  Send Reset Link
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </section>
      <Typography sx={{ mt: 6, fontSize: '14px' }}>
        Wait, I remember my password...{' '}
        <span
          className='underline inline text-sm font-bold cursor-pointer'
          onClick={() => navigate('/auth/login')}
        >
          Click here
        </span>
      </Typography>
    </>
  );
};

export default ForgotPasswordTemplate;
