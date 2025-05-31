import { Box, Typography } from '@mui/material';
import { Categories } from 'types';
import useApp from 'hooks/useApp';

type CategoryPropType = {
  onItemClick: (subcategoryId: string) => void;
  selectedCategory: string;
};

const Category = (props: CategoryPropType) => {
  const { categories } = useApp();
  const { onItemClick, selectedCategory } = props;

  return (
    <Box className='p-4'>
      <Typography className='uppercase text-xs font-medium text-[#878A99] mb-2'>
        Categories
      </Typography>
      <Box>
        {categories.map((item: Categories, index: number) => (
          <Typography
            key={index}
            className='text-[13px] text-[#495057] font-medium py-1 capitalize '
          >
            {item.name}
            {item.subcategory &&
              item?.subcategory.map((subItem: any, index: number) => (
                <Typography
                  key={index}
                  className={`ml-5 text-xs font-medium py-1 cursor-pointer hover:text-[#0ab39c] transition-all ${
                    selectedCategory === subItem._id ? 'text-[#0ab39c]' : ''
                  }`}
                  onClick={() => onItemClick(subItem._id)}
                >
                  {subItem.name}
                </Typography>
              ))}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Category;
