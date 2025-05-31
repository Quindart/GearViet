import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'utils/app-config';
import shape from '../../../../assets/images/shape.svg';
import AuthLayoutCustom from './style';
import { getValueFromLocalStorage } from 'utils/helper';
import Loading from 'components/ui/Loading';
import useApp from 'hooks/useApp';

const AuthLayout = () => {
  const { isLoading } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const access_token: string = getValueFromLocalStorage('access_token') || '';

    if (access_token) {
      return navigate(APP_ROUTES.INDEX);
    }

    if (!location.pathname.includes('auth/')) {
      return navigate(APP_ROUTES.LOGIN);
    }
  }, [location]);

  if (isLoading) return <Loading />;
  return (
    <AuthLayoutCustom>
      <Box className='box__bg'>
        <Box className='w-full h-full bg-gradient-to-r from-[#364574] to-[#405189] opacity-50'></Box>
        <img src={shape} className='absolute bottom-0' />
      </Box>
      <Outlet />
    </AuthLayoutCustom>
  );
};

export default AuthLayout;
