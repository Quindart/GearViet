import { Icon } from '@iconify/react';
import CustomTag from './style';

type TagPropsType = {
  value: string | number;
  onDelete?: () => void;
};

const Tag = (props: TagPropsType) => {
  return (
    <CustomTag>
      {props.value}
      <span onClick={props.onDelete}>
        <Icon icon='ic:baseline-close' />
      </span>
    </CustomTag>
  );
};

export default Tag;
