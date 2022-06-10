import { Container, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { SkeletonPostItem } from 'src/components/skeleton';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import CourseCard from 'src/sections/@dashboard/courses/CourseCard';
import CourseFilter from 'src/sections/@dashboard/courses/CourseFilter';
import CourseSearch from 'src/sections/@dashboard/courses/CourseSearch';
import BlogPostsSearch from 'src/sections/@dashboard/courses/CourseSearch';
import axiosInstance from 'src/utils/axios';
// layouts

// ----------------------------------------------------------------------

PageCourses.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageCourses() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/blog/posts/all');

      if (isMountedRef.current) {
        console.log(response);
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Page title="Courses Page">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <CourseSearch />
          <CourseFilter />
        </Stack>

        <Grid container spacing={3}>
          <Grid item sx={9}>
            <Grid container spacing={3}>
              {(!posts.length ? [...Array(12)] : posts).map((post, index) =>
                post ? (
                  <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                    <CourseCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
              )}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h1">Tho</Typography>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
