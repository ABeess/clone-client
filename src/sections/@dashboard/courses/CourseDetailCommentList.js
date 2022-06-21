import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//
import CourseDetailCommentItem from './CourseDetailCommentItem';

// ----------------------------------------------------------------------

CourseDetailCommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function CourseDetailCommentList({ post }) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id } = comment;

        return (
          <Box key={id}>
            <CourseDetailCommentItem
              name={comment.name}
              atarUrl={comment.avatarUrl}
              postedAt={comment.postedAt}
              message={comment.message}
            />
          </Box>
        );
      })}
    </List>
  );
}
