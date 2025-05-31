import MainLayout from 'components/shared/layouts/MainLayout';
import { Navigate } from 'react-router-dom';
import { getValueFromLocalStorage } from 'utils/helper';
const PrivateRouter = () => {
  const access_token: string = getValueFromLocalStorage('access_token') || '';

  return access_token ? <MainLayout /> : <Navigate to='/auth/login' />;
};

export default PrivateRouter;
