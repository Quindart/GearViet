import { Icon } from '@iconify/react';
import { Box, FormHelperText, Typography } from '@mui/material';
import Button from 'components/ui/Button';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { deleteFile, uploadFile } from 'services/appApi';
import { InfoGroupWrapper } from '..';
import NewProductContext from '../Context';
import LinearProgress from '@mui/material/LinearProgress';
const fileExtensions: string[] = ['png', 'jpg', 'jpeg'];

const Gallery = () => {
  const { t } = useTranslation();
  const { setFieldValue, values, errors, setFieldError } = React.useContext(NewProductContext);
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = React.useState(0);

  const uploadProductImage = async (file: File) => {
    if (progress === 0) {
      const timer = setInterval(() => {
        setProgress((oldProgress: number) => {
          const diff = Math.random() * 20;
          return Math.min(oldProgress + diff, 100);
        });
      }, 200);
      checkFileType(file.type);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'product');
      const response: any = await uploadFile(formData);
      setProgress(0);
      clearInterval(timer);
      if (!response.success) {
        enqueueSnackbar(response.message, { variant: 'error' });
        return;
      }
      enqueueSnackbar(t('pages/products:uploadImageSuccess', { defaultValue: 'Image uploaded successfully' }), { variant: 'success' });
      const images = [...values.images, response.image];
      setFieldValue('images', images);
      setFieldError('images', '');
    }
  };

  function checkFileType(type: string) {
    const isImage = fileExtensions.some((ex: string) => type.includes(ex));
    if (!isImage) {
      enqueueSnackbar(t('pages/products:invalidImageType', { defaultValue: 'Only png, jpg, jpeg files are accepted' }), { variant: 'error' });
      return;
    }
  }
  const deleteProductImage = async (public_id: string) => {
    const response: any = await deleteFile(public_id);
    if (!response.success) {
      enqueueSnackbar(response.message, { variant: 'error' });
      return;
    }
    enqueueSnackbar(t('pages/products:deleteImageSuccess', { defaultValue: 'Image deleted successfully' }), { variant: 'success' });
    const images = values.images.filter((item: any) => item.public_id !== public_id);
    setFieldValue('images', images);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log("💲💲💲 ~ handleChange ~ files:", files)
    const selectedFiles = files as FileList;
    console.log("💲💲💲 ~ handleChange ~ selectedFiles:", selectedFiles)
    await uploadProductImage(selectedFiles[0] as File);
    e.target.value = '';
  };

  return (
    <InfoGroupWrapper heading={t('pages/products:productImage', { defaultValue: 'Product image' })}>
      <section className='flex flex-col mb-10 w-full '>
        <div className='file__bx text-center border-2 border-dashed'>
          <div className='upload-file' title={t('pages/products:uploadFile', { defaultValue: 'Upload file' })}>
            {values.images.length < 4 ? (
              <label
                htmlFor='upload-file'
                className='flex flex-col cursor-pointer items-center justify-center gap-6 h-full w-full'
                onSubmit={() => {}}
              >
                <Icon icon='ri:upload-cloud-2-fill' className='text-[50px]' />
                <Typography className='text-lg font-medium text-[#495057]'>{t('pages/products:selectImage', { defaultValue: 'Select image' })}</Typography>
                <input
                  type='file'
                  id='upload-file'
                  name='image'
                  hidden
                  multiple={false}
                  onChange={handleChange}
                />
              </label>
            ) : (
              <Typography className='text-lg font-medium text-[#495057]'>{t('pages/products:maxImages', { defaultValue: 'Maximum 4 images' })}</Typography>
            )}
          </div>
        </div>
        {errors.images && (
          <FormHelperText error={Boolean(errors.images)} className='text-xs mt-2 ml-1'>
            {errors.image}
          </FormHelperText>
        )}
        {progress !== 0 && (
          <LinearProgress variant='determinate' className='my-2' value={progress} />
        )}
        {values.images.length > 0 &&
          values.images.map((item: any, index: number) => (
            <Box
              key={index}
              className='flex justify-between items-center p-2 border border-[#e9ebec] mt-2 rounded-md'
            >
              <img src={item.url} alt={item.url} className='w-12 h-12 object-cover' />
              <Button
                variant='contained'
                className='btn--danger h-8 font-normal text-[13px]'
                onClick={() => deleteProductImage(item.public_id)}
              >
                {t('shared/common:delete', { defaultValue: 'Delete' })}
              </Button>
            </Box>
          ))}
      </section>
    </InfoGroupWrapper>
  );
};

export default React.memo(Gallery);
