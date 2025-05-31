import Tag from 'components/ui/Tag';
import React, { useState } from 'react';
import NewProductContext from '../Context';
import TextField from 'components/ui/TextField';

const Tags = () => {
  const { values, setFieldValue } = React.useContext(NewProductContext);
  const [newTag, setNewTag] = useState<string>('');
  const [error, setError] = useState(false);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setNewTag(e.target.value);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (values.tags.includes(newTag)) {
        setError(true);
        return;
      }
      setFieldValue('tags', [...values.tags, newTag]);
      setNewTag('');
      setError(false);
    }
  };

  const handleDeleteTag = (pickedTag: string) => {
    const newTagsList = values.tags.filter((tag: string) => tag !== pickedTag);
    setFieldValue('tags', newTagsList);
  };
  const inputWithStyle = {
    minWidth: '1ch',
    width: `${1 + newTag.length}ch`,
  };
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <section className='border-0 ' onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className='relative'>
        <TextField
          className='border-0 mb-2'
          inputRef={inputRef}
          sx={inputWithStyle}
          role='text-box'
          type='text'
          value={newTag}
          error={Boolean(error)}
          helperText={Boolean(error) && 'Tag is exist!'}
          onChange={inputChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        {newTag && !error && (
          <div className='tag_tooltip'>
            <div className='tag_tooltip-text'>Press Enter to add</div>
          </div>
        )}
      </div>
      {values.tags.map((tag: string) => (
        <Tag value={tag} key={tag} onDelete={() => handleDeleteTag(tag)} />
      ))}
    </section>
  );
};

export default Tags;
