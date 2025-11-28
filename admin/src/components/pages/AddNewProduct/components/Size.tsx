import TextField from 'components/ui/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NewProductContext from '../Context';

const Size = () => {
  const { t } = useTranslation();
  const { values, errors, touched, handleBlur, handleChange } = React.useContext(NewProductContext);

  return (
    <section className='flex gap-4'>
      <TextField
        label={t('pages/products:width', { defaultValue: 'Width' })}
        value={values.width}
        className='border-0 mb-2'
        type='number'
        placeholder='0'
        role='text-box'
        name='width'
        id='width'
        error={touched.width && Boolean(errors.width)}
        helperText={touched.width && errors.width}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <TextField
        label={t('pages/products:length', { defaultValue: 'Length' })}
        value={values.length}
        className='border-0 mb-2'
        type='number'
        placeholder='0'
        role='text-box'
        name='length'
        id='length'
        error={touched.length && Boolean(errors.length)}
        helperText={touched.length && errors.length}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <TextField
        label={t('pages/products:height', { defaultValue: 'Height' })}
        value={values.height}
        className='border-0 mb-2'
        type='number'
        placeholder='0'
        role='text-box'
        name='height'
        id='height'
        error={touched.height && Boolean(errors.height)}
        helperText={touched.height && errors.height}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <TextField
        label={t('pages/products:weight', { defaultValue: 'Weight' })}
        value={values.weight}
        className='border-0 mb-2'
        type='number'
        placeholder='0'
        role='text-box'
        name='weight'
        id='weight'
        error={touched.weight && Boolean(errors.weight)}
        helperText={touched.weight && errors.weight}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </section>
  );
};

export default Size;
