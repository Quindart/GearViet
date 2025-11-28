import TextField from 'components/ui/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoGroupWrapper } from '..';
import NewProductContext from '../Context';

const GeneralInfo = () => {
  const { t } = useTranslation();
  const { values, errors, touched, handleBlur, handleChange } = React.useContext(NewProductContext);

  return (
    <InfoGroupWrapper heading={t('pages/products:generalInformation', { defaultValue: 'General information' })}>
      <div className='flex justify-between flex-col items-start flex-wrap '>
        <aside className='w-full mb-2'>
          <TextField
            disabled
            label={t('pages/products:productCode', { defaultValue: 'Product Code' })}
            name='code'
            value={values.code.toUpperCase()}
            type='string'
            placeholder={t('pages/products:productCode', { defaultValue: 'Product code' })}
            id='code'
          />
        </aside>
        <aside className='w-full mb-2'>
          <TextField
            label={t('pages/products:brand', { defaultValue: 'Brand' })}
            name='brand'
            value={values.brand}
            error={touched.brand && Boolean(errors.brand)}
            helperText={touched.brand && errors.brand}
            type='string'
            placeholder={t('pages/products:brand', { defaultValue: 'Brand' })}
            id='brand'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </aside>
        <aside className='w-full mb-2'>
          <TextField
            label={t('pages/products:quantity', { defaultValue: 'Quantity' })}
            name='available'
            value={values.available}
            error={touched.available && Boolean(errors.available)}
            helperText={touched.available && errors.available}
            type='number'
            placeholder={t('pages/products:stock', { defaultValue: 'Stock' })}
            id='available'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </aside>

        <aside className='w-full mb-2 '>
          <TextField
            label={t('pages/products:price', { defaultValue: 'Price' })}
            name='price'
            type='number'
            value={values.price}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
            placeholder={t('pages/products:price', { defaultValue: 'Price' })}
            id='price'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </aside>
      </div>
    </InfoGroupWrapper>
  );
};

export default React.memo(GeneralInfo);
