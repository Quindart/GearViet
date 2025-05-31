import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import { useRef, memo, useEffect, useState } from 'react';
import { CustomModal } from '../style';
import { CommentType, ReplyType } from 'types/product';
import { ResponseType } from 'types';
import dayjs from 'dayjs';
import avatar from '../../../../assets/images/avatar.jpg';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { fetchCommentByProductId, replyComment } from 'services/commentApi';
import useUser from 'hooks/useUser';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

type CommentModalTypes = {
  onClose: () => void;
  id: string;
};

const CommentModal = (props: CommentModalTypes) => {
  const { onClose, id } = props;
  const { adminDetail } = useUser();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [replyIndexes, setReplyIndexes] = useState<number[]>([]);
  const replyContentRef = useRef<HTMLInputElement | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCommentByProductId(id).then((res: ResponseType) => {
      if (res.success && res.comments) {
        setComments(res.comments);
      } else {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
        onClose();
      }
    });
  }, []);

  const handleReply = async (commentId: string) => {
    if (replyContentRef.current) {
      const content = replyContentRef.current.value;
      if (!content) {
        return;
      }
      const res: ResponseType = await replyComment(commentId, content, adminDetail?.name);
      if (res.success && res.comment) {
        const newComments: CommentType[] | undefined = comments.map((comment: CommentType) => {
          if (comment._id === res.comment?._id && res?.comment?.reply) {
            return {
              ...comment,
              reply: res.comment.reply,
            };
          }
          return comment;
        });
        if (newComments) {
          setComments(newComments);
        }
      } else {
        enqueueSnackbar('Vui lòng thử lại sau', { variant: 'error' });
      }
      replyContentRef.current.value = '';
    }
  };

  const handleCloseReply = (commentIndex: number) => {
    const indexes = replyIndexes.filter((index: number) => index !== commentIndex);
    setReplyIndexes(indexes);
  };
  return (
    <CustomModal>
      <Box className='header'>
        <Typography>Comment</Typography>
        <Icon icon='ph:x-duotone' onClick={onClose} />
      </Box>
      <Box className='content__bx comment__content__bx'>
        {comments.length > 0 ? (
          comments.map((comment: any, commentIndex: number) => (
            <Box className='content__item comment__item' key={commentIndex}>
              <img src={comment?.user?.avatar ? comment?.user?.avatar : avatar} alt='user avatar' />
              <Box className='comment__content'>
                <Box className='comment__content__title'>
                  <Typography>
                    {comment?.user?.name ? comment?.user?.name : comment.personName}{' '}
                  </Typography>
                  <Typography>
                    {dayjs(comment.createdAt).format('HH:mm  - DD , MMM/YYYY')}
                  </Typography>
                </Box>
                <Box>
                  <Typography className='comment__text'>{comment.comment}</Typography>
                  <Box
                    className='reply__bx'
                    onClick={() => setReplyIndexes([...replyIndexes, commentIndex])}
                  >
                    <Icon icon='mdi:message-outline' />
                    <Typography>Reply {comment.reply.length}</Typography>
                  </Box>
                  {replyIndexes.includes(commentIndex) && (
                    <Box className='reply__content__bx'>
                      {comment.reply.length > 0 &&
                        comment.reply.map((reply: ReplyType, replyIndex: number) => (
                          <Box className='reply__container-container' key={replyIndex}>
                            <Link to={`/user/${reply.user?._id}`}>
                              <img
                                src={
                                  reply?.user?.avatar.url !== 'none'
                                    ? reply?.user?.avatar.url
                                    : avatar
                                }
                                alt='avatar'
                              />
                            </Link>
                            <Box className='reply__info'>
                              <Box className=''>
                                <Link to={`/user/${reply.user?._id}`}>
                                  <Typography>{reply?.user?.username}</Typography>
                                </Link>
                                <Typography className='comment__text'>{reply.content}</Typography>
                              </Box>
                              <Box>
                                <Typography className='reply__date'>
                                  {dayjs(reply.createdAt).format('HH:mm  - DD , MMM/YYYY')}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}

                      <TextField placeholder='Input reply here' inputRef={replyContentRef} />
                      <Box className=''>
                        <Button onClick={() => handleCloseReply(commentIndex)}>Cancel</Button>
                        <Button
                          variant='contained'
                          className='btn--save'
                          onClick={() => handleReply(comment._id)}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box className='content__empty'>
            <h1 className=''>Khong co bình luận nào </h1>
          </Box>
        )}
      </Box>
    </CustomModal>
  );
};

export default memo(CommentModal);
