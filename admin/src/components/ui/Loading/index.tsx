import { CircularProgress } from '@mui/material';
import CustomLoading from './style';

const Loading = () => {
  return (
    <CustomLoading>
      <CircularProgress />
    </CustomLoading>
  );
};

export default Loading;
