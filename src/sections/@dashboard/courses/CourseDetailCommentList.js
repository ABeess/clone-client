import PropTypes from 'prop-types';
// @mui
import { Box, List } from '@mui/material';
//component
import CourseDetailCommentItem from './CourseDetailCommentItem';

// ----------------------------------------------------------------------

// CourseDetailCommentList.propTypes = {
//   post: PropTypes.object.isRequired,
// };

export default function CourseDetailCommentList({ post }) {
  // const { comments } = post;

  return (
    <List disablePadding>
      {[]?.map((comment) => {
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
