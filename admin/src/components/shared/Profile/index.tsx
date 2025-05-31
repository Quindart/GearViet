import { Icon } from '@iconify/react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import DropDown from 'components/ui/Dropdown';
import TextField from 'components/ui/TextField';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { toggleChangePasswordModal } from 'store/slices/appSlice';
import { ResponseType } from 'types';
import { IUser } from 'types/user';
import { fetchAdminDetail, updateUserInfor } from '../../../services/userApi';
import ChangePassword from './ChangePassword';
import CustomProfileModal from './style';
import useShipping from '../../../hooks/useShipping';
import { useSnackbar } from 'notistack';
import { uploadFile } from 'services/appApi';
import { setAdminDetail } from 'store/slices/userSlice';
const fileExtensions: string[] = ['png', 'jpg', 'jpeg'];

const DropDownOptions = [
  {
    name: 'Male',
    _id: 'male',
  },
  {
    name: 'Female',
    _id: 'female',
  },

  {
    name: 'None',
    _id: 'none',
  },
];

type ProfileModalTypes = {
  onClose: () => void;
};

const ProfileModal = (props: ProfileModalTypes) => {
  const { onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isShowChangePasswordModal = useSelector(
    (state: RootState) => state.app.isShowChangePasswordModal,
  );

  const {
    provinceList,
    districtList,
    wardList,
    getAllProvince,
    getAllDistrictByProvince,
    getAllWardByDistrict,
  } = useShipping();

  const [currentUser, setCurrentUser] = useState<IUser>({
    username: '',
    role: '',
    email: '',
    _id: '',
    status: '',
    name: '',
    gender: '',
    address: {
      province: {
        provinceId: 0,
        provinceName: '',
      },
      district: {
        districtId: 0,
        districtName: '',
      },
      ward: {
        wardId: 0,
        wardName: '',
      },
      detail: '',
    },
    phone: '',
    avatar: {
      url: '',
      public_id: '',
    },
  });

  // const [currentFile, setCurrentFile] = useState<string>('');

  const getUserData = async () => {
    const response: ResponseType = await fetchAdminDetail();
    const { user } = response;
    if (user) {
      setCurrentUser(user);
      getAllProvince();
      getAllDistrictByProvince(user?.address.province.provinceId as number);
      getAllWardByDistrict(user?.address.district.districtId as number);
    }
  };

  const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleProvinceChange = (e: SelectChangeEvent<unknown>) => {
    const selectedProvince = provinceList.find(
      (item: { _id: number; name: string }) => item._id === e.target.value,
    );

    setCurrentUser({
      ...currentUser,
      address: {
        ...currentUser.address,
        province: {
          provinceId: selectedProvince._id,
          provinceName: selectedProvince.name,
        },
        district: {
          districtId: 0,
          districtName: '',
        },
        ward: {
          wardId: 0,
          wardName: '',
        },
      },
    });
    getAllDistrictByProvince(selectedProvince._id);
  };

  const handleDistrictChange = (e: SelectChangeEvent<unknown>) => {
    const selectedDistrict = districtList.find(
      (item: { _id: number; name: string }) => item._id === e.target.value,
    );
    setCurrentUser({
      ...currentUser,
      address: {
        ...currentUser.address,
        district: {
          districtId: selectedDistrict._id,
          districtName: selectedDistrict.name,
        },
        ward: {
          wardId: 0,
          wardName: '',
        },
      },
    });
    getAllWardByDistrict(selectedDistrict._id);
  };

  const handleWardChange = (e: SelectChangeEvent<unknown>) => {
    const selectedWard = wardList.find(
      (item: { _id: number; name: string }) => item._id === e.target.value,
    );
    setCurrentUser({
      ...currentUser,
      address: {
        ...currentUser.address,
        ward: {
          wardId: selectedWard._id,
          wardName: selectedWard.name,
        },
      },
    });
  };

  const handleGenderChange = (e: SelectChangeEvent<unknown>) => {
    setCurrentUser({ ...currentUser, gender: e.target.value as string });
  };

  const onSave = async () => {
    if (
      currentUser.address.province.provinceId === 0 ||
      currentUser.address.district.districtId === 0 ||
      currentUser.address.ward.wardId === 0
    ) {
      alert('Fill all address field');
      return;
    }

    const response: ResponseType = await updateUserInfor(currentUser._id, currentUser);
    if (response.success) {
      enqueueSnackbar('Update user information successfully', {
        variant: 'success',
      });
      onClose();
    } else {
      enqueueSnackbar(response.message, { variant: 'error' });
      return;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    await uploadProductImage(selectedFiles[0] as File);
    e.target.value = '';
  };

  const uploadProductImage = async (file: File) => {
    checkFileType(file.type);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'avatar');
    const response: ResponseType = await uploadFile(formData);
    if (!response.success) {
      enqueueSnackbar(response.message, { variant: 'error' });
      return;
    }
    if (response.image) {
      const tmpUser = {
        ...currentUser,
        avatar: {
          public_id: response.image.public_id as string,
          url: response.image.url as string,
        },
      };
      await updateUserInfor(currentUser._id, tmpUser);
      dispatch(setAdminDetail(tmpUser));
    }
    enqueueSnackbar('Tải ảnh lên thành công', { variant: 'success' });
    getUserData();
  };

  function checkFileType(type: string) {
    const isImage = fileExtensions.some((ex: string) => type.includes(ex));
    if (!isImage) {
      enqueueSnackbar('Chỉ nhấp nhận các file png, jpg, jpeg', { variant: 'error' });
      return;
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <CustomProfileModal>
      <Box className='header'>
        <Box className='header__bg'>
          <img
            src='https://themesbrand.com/velzon/html/default/assets/images/small/img-9.jpg'
            alt='https://themesbrand.com/velzon/html/default/assets/images/small/img-9.jpg'
          />
        </Box>
        <Box className='header__avatar'>
          <img src={currentUser.avatar.url} alt={currentUser.avatar.url} />
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='raised-button-file'
            // multiple
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='raised-button-file'>
            <Box className='icon__bx'>
              <Icon icon='ri:camera-fill' />
            </Box>
          </label>
        </Box>
      </Box>
      <Box className='title'>
        <Typography className='title__name'>{currentUser?.username}</Typography>
        <Typography className='title__role'>{currentUser?.role}</Typography>
      </Box>
      <Box className='button__bx'>
        <Button
          variant='contained'
          className='primary'
          onClick={() => dispatch(toggleChangePasswordModal())}
        >
          {isShowChangePasswordModal ? 'Change profile' : 'Change password'}
        </Button>
      </Box>
      {isShowChangePasswordModal ? (
        <ChangePassword onClose={onClose} />
      ) : (
        <form>
          <Box className='content'>
            <TextField
              variant='standard'
              label='Username'
              disabled
              placeholder='adminTestABC'
              value={currentUser?.username}
            />
            <TextField
              variant='standard'
              label='Name'
              name='name'
              placeholder='Mr Quang'
              value={currentUser?.name}
              onChange={changeInputData}
            />
            <Box>
              <DropDown
                label='Province'
                options={provinceList}
                fullWidth
                value={currentUser?.address.province.provinceId}
                onChange={handleProvinceChange}
              />
            </Box>
            <Box>
              <DropDown
                label='District'
                options={districtList}
                fullWidth
                value={currentUser?.address.district.districtId}
                onChange={handleDistrictChange}
              />
            </Box>
            <Box>
              <DropDown
                label='Ward'
                options={wardList}
                fullWidth
                value={currentUser?.address.ward.wardId}
                onChange={handleWardChange}
              />
            </Box>
            <TextField
              variant='standard'
              label='Address Detail'
              placeholder='Ha Noi City'
              value={currentUser?.address.detail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentUser({
                  ...currentUser,
                  address: { ...currentUser.address, detail: e.target.value },
                })
              }
            />
            <TextField
              variant='standard'
              label='Phone'
              name='phone'
              placeholder='09821018292'
              value={currentUser?.phone}
              onChange={changeInputData}
            />
            <TextField
              variant='standard'
              label='Email'
              name='email'
              placeholder='quangfe@gmail.com'
              value={currentUser?.email}
              onChange={changeInputData}
            />
            <Box>
              <DropDown
                label='Gender'
                options={DropDownOptions}
                fullWidth
                value={currentUser?.gender}
                onChange={handleGenderChange}
              />
            </Box>
          </Box>
          <Box
            sx={{
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={props.onClose}>Close</Button>
            <Button type='button' variant='contained' className='btn--success' onClick={onSave}>
              Save
            </Button>
          </Box>
        </form>
      )}
    </CustomProfileModal>
  );
};

export default ProfileModal;
