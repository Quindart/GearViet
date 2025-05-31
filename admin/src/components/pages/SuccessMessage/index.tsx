import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';
import { APP_ROUTES } from 'utils/app-config';
import icon_check from '../../../assets/images/icon_check.png';

const SuccessMessageTemplate = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className='container z-40'>
        <Box component='section' className='text-center' maxWidth='sx'>
          <Box className='flex justify-center  p-5'>
            <Box
              component='div'
              className='w-28 px-5 py-2 rounded-full'
              sx={{ bgcolor: theme.bg_auth }}
            >
              <img src={icon_check} className='w-30 my-3'></img>
            </Box>
          </Box>
          <Typography
            component='h5'
            variant='h5'
            sx={{ color: theme.text_label, fontsize: '16px', fontWeight: '600' }}
          >
            Well done !
          </Typography>
          <Typography className='text-sm text-slate-400 mb-5' sx={{ fontWeight: '300' }}>
            Aww yeah, you successfully read this important message.
          </Typography>
          <Button
            className='btn--auth'
            variant='contained'
            type='submit'
            onClick={() => {
              navigate(APP_ROUTES.LOGIN);
            }}
          >
            Back to Login
          </Button>
        </Box>
      </section>
    </>
  );
};
export default SuccessMessageTemplate;
