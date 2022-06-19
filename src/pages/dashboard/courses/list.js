import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { SkeletonPostItem } from 'src/components/skeleton';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { PATH_DASHBOARD } from 'src/routes/path';
import Layout from 'src/layouts';
import Page from 'src/components/Page';
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from 'src/sections/@dashboard/courses';
import useSettings from 'src/hooks/useSettings';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

BlogPosts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function BlogPosts() {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/all');

      if (isMountedRef.current) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={8} sm={8} md={8}>
            <Grid container spacing={2}>
              {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
                post ? (
                  <Grid key={post.id} item xs={12} sm={6} md={4}>
                    <BlogPostCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
              )}
            </Grid>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Grid container spacing={2}>
              {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
                post ? (
                  <Grid key={post.id} item xs={12} sm={12} md={12}>
                    <BlogPostCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
