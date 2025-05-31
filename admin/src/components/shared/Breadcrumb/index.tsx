import { Breadcrumbs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BreadcrumCustom from './style';
import theme from './../../../theme/index';
import useApp from 'hooks/useApp';

const Breadcrumb = () => {
  const location = useLocation();
  const { hideSideBar } = useApp();
  const currentLocation = location.pathname;

  const arrLocation = location.pathname.slice(1).split('/');
  return (
    <BreadcrumCustom
      className={`${
        !hideSideBar ? 'w-[calc(100%-70px)] left-[70px]' : 'w-[calc(100%-249px)] left-[249px]'
      }  ${currentLocation === '/' ? 'hidden' : 'flex'}`}
    >
      <Typography className='title'>{arrLocation[0]}</Typography>
      <Breadcrumbs separator='›' aria-label='breadcrumb' className='hidden md:block'>
        <Typography className={`item text-[${theme.text_rubric}]`}>Home</Typography>
        {arrLocation.map((item: string, index: number) => (
          <Typography key={index} className='item'>
            {item}
          </Typography>
        ))}
      </Breadcrumbs>
    </BreadcrumCustom>
  );
};

export default Breadcrumb;
