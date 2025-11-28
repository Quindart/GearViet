import RickTextEditor from 'components/ui/RickTextEditor';
import TextField from 'components/ui/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoGroupWrapper } from '..';
import NewProductContext from '../Context';
import { createProductCode } from 'utils/helper';
import { validateProductCode } from 'services/productApi';
import { useSnackbar } from 'notistack';
import { ResponseType } from 'types';

const Content = () => {
  const { t } = useTranslation();
  const { values, errors, touched, setTouched, setFieldValue, handleBlur, handleChange } =
    React.useContext(NewProductContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeDescription = (content: string) => {
    setFieldValue('description', content);
    setTouched({ ['description']: true }, true);
  };

  const addProductCode = async (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    if (e.target.value === '') {
      setFieldValue('code', '');
      return;
    }
    if (values.code) {
      return;
    }
    const productCode = createProductCode(e.target.value);
    const res: ResponseType = await validateProductCode(productCode);
    if (!res.success) {
      enqueueSnackbar(t('pages/products:productCodeExists', { defaultValue: 'Product code already exists. Change product name to create a new code' }), {
        variant: 'error',
      });
      return;
    }
    setFieldValue('code', productCode);
  };
  return (
    <InfoGroupWrapper>
      <TextField
        label={t('pages/products:productName', { defaultValue: 'Product Name' })}
        name='name'
        value={values.name}
        placeholder={t('pages/products:enterProductName', { defaultValue: 'Enter product name' })}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        id='title'
        onBlur={addProductCode}
        onChange={handleChange}
        className='mb-4'
      />
      <RickTextEditor
        id='textarea'
        name='description'
        label={t('pages/products:productDescription', { defaultValue: 'Product Description' })}
        value={values.description}
        onBlur={handleChangeDescription}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
      />
    </InfoGroupWrapper>
  );
};

export default React.memo(Content);

export {};
