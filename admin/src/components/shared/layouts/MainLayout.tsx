import { Box } from '@mui/material';
import Loading from 'components/ui/Loading';
import useApp from 'hooks/useApp';
import useUser from 'hooks/useUser';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { toggleProfileModal } from 'store/slices/appSlice';
import Breadcrumb from '../Breadcrumb';
import Navbar from '../Navbar';
import ProfileModal from '../Profile';
import AdminSidebar from '../Sidebar';
import theme from './../../../theme/index';
import Modal from './../../ui/Modal/index';
import { APP_ROUTES, APP_SIDEBAR } from 'utils/app-config';

const MainLayout = () => {
  const { isLoading, fetchCategories, getAllBrand, setIsLoading } = useApp();
  const { getAdminDetail, adminDetail } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!adminDetail) {
      getAdminDetail();
      setIsLoading(true);
    }
  }, []);
  useEffect(() => {
    for (const item of APP_SIDEBAR) {
      if (item.link.includes(location.pathname)) {
        if (adminDetail) {
          if (!item.roles.includes(adminDetail.role)) {
            navigate(APP_ROUTES.NOT_FOUND);
          }
          return;
        }
      }
    }
  }, [adminDetail, location.pathname]);
  useEffect(() => {
    if (!adminDetail) return;
    fetchCategories();
    getAllBrand();
    setIsLoading(false);
  }, [adminDetail]);

  const isShowProfileModal = useSelector((state: RootState) => state.app.isShowProfileModal);

  if (isLoading) return <Loading />;
  return (
    <>
      <Box
        component='main'
        className='flex w-full min-h-screen h-auto'
        sx={{ backgroundColor: theme.bg_app }}
      >
        <AdminSidebar />
        <Box component='section' className=' flex flex-col w-full'>
          <Navbar />
          <Breadcrumb />
          <Box
            component='section'
            className={`${location.pathname === '/' ? 'mt-0' : 'mt-12'} w-full px-6`}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Modal open={isShowProfileModal} onClose={() => dispatch(toggleProfileModal())}>
        <ProfileModal onClose={() => dispatch(toggleProfileModal())} />
      </Modal>
    </>
  );
};

export default memo(MainLayout);
