import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Card, Divider, Container, Typography, Pagination, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/path';
// hooks
import useSettings from 'src/hooks/useSettings';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// utils
import axios from 'src/utils/axios';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import Markdown from 'src/components/Markdown';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// import { SkeletonPost } from 'src/components';
import {
  CourseDetailHero,
  CourseDetailCart,
  CourseDetailContent,
  CourseDetailRating,
  CourseDetailCommentList,
  CourseDetailsCommentForm,
  CourseDetailRecent,
  CourseDetailList,
} from 'src/sections/@dashboard/courses';
import { SkeletonPost } from 'src/components/skeleton';
// import BlogPostCommentList from 'src/sections/@dashboard/courses/BlogPostCommentList';
// import CourseDetailsCommentForm from 'src/sections/@dashboard/courses/BlogPostCommentForm';
// sections

// ----------------------------------------------------------------------

CourseDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CourseDetail() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { query } = useRouter();

  const { title } = query;

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/post', {
        params: { title: 'apply-these-7-secret-techniques-to-improve-event' },
      });

      if (isMountedRef.current) {
        setPost(response.data.post);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, title]);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      if (isMountedRef.current) {
        setRecentPosts(response.data.recentPosts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, title]);

  useEffect(() => {
    getPost();
    getRecentPosts();
  }, [getRecentPosts, getPost]);

  return (
    <Page title="Course Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Course Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Course', href: PATH_DASHBOARD.courses.root },
            { name: sentenceCase('title') },
          ]}
        />

        {post && (
          <>
            <CourseDetailHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  {/* <Markdown children={post.body} /> */}
                  <CourseDetailList />
                  {/* <CourseDetailContent /> */}
                </Grid>
                <Grid item xs={4}>
                  <CourseDetailCart />
                </Grid>
              </Grid>

              <Box sx={{ my: 5 }}>
                <Divider />
                <CourseDetailRating post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <CourseDetailCommentList post={post} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <CourseDetailsCommentForm />
            </Box>
          </>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">404 {error}!</Typography>}

        <CourseDetailRecent posts={recentPosts} />
      </Container>
    </Page>
  );
}
