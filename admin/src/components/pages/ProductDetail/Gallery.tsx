import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { CustomGallery } from './style';
import { ProductDataType } from 'types/product';
type GalleryPropType = {
  product: ProductDataType;
};
const Gallery = (props: GalleryPropType) => {
  const { images, name } = props.product;
  const [activeItem, setActiveItem] = useState<number>(0);

  return (
    <CustomGallery className='xl:max-w-[540px] '>
      <Box className='relative'>
        {images?.length > 0 ? (
          <>
            <img
              src={images[activeItem]?.url}
              alt={name}
              className='img__head lg:w-[500px] lg:max-w-[500px]'
            />

            <Box className='icon__bx'>
              <Box
                className={`icon__item ${activeItem === 0 ? 'opacity-[0.35] ' : 'text-[#405189]'}`}
                onClick={() => (activeItem > 0 ? setActiveItem(activeItem - 1) : {})}
              >
                <Icon icon='material-symbols:chevron-left' />
              </Box>
              <Box
                className={`icon__item ${activeItem === 3 ? 'opacity-[0.35]' : 'text-[#405189] '}`}
                onClick={() => (activeItem < 3 ? setActiveItem(activeItem + 1) : {})}
              >
                <Icon icon='material-symbols:chevron-right' />
              </Box>
            </Box>
          </>
        ) : (
          <div className='flex h-[300px] bg-slate-200 rounded'>
            <p className='m-auto'>NO image</p>
          </div>
        )}
      </Box>
      <Box className='img__bx lg:max-w-[500px]'>
        {images &&
          images.map((item: any, index: number) => (
            <Box
              key={index}
              className={`img__item ${activeItem === index ? 'active' : ''}`}
              onClick={() => setActiveItem(index)}
            >
              <img src={item.url} alt={item.url} />
            </Box>
          ))}
      </Box>
    </CustomGallery>
  );
};

export default Gallery;
