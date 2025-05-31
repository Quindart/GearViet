import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import { useNavigate } from 'react-router-dom';
import img_page404 from '../../../assets/images/img_page404.svg';

const NotFoundTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box component='div' className=''>
        <img src={img_page404} alt='' className='w-96 bottom-0 mx-auto' />
      </Box>
      <Box component='section' className='w-26 text-center text-gray-500'>
        <Typography component='h1' variant='h1'>
          404
        </Typography>
        <Typography component='h5' variant='h5'>
          SORRY, PAGE NOT FOUND 😭
        </Typography>
        <Typography variant='subtitle1' className='text-slate-400'>
          The page you are looking for not available!
        </Typography>
        <Button className='btn--success w-50 ' variant='contained' onClick={() => navigate(-1)}>
          <Icon icon='ic:home' className=' text-xl m-1'></Icon>
          Back to previous page
        </Button>
      </Box>
    </>
  );
};
export default NotFoundTemplate;
