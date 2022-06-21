import PropTypes from 'prop-types';
// @mui
import { Grid, Typography } from '@mui/material';
//
import BlogPostCard from './CourseCard';

// ----------------------------------------------------------------------

CourseDetailRecent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function CourseDetailRecent({ posts }) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={3}>
            <BlogPostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
