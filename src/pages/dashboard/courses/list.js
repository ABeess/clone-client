import { Container, Grid, Stack } from '@mui/material';
import { orderBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { SkeletonPostItem } from 'src/components/skeleton';
import { getAllCourse } from 'src/fetching/course.api';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import { CourseCard, CourseFilter, CourseSearch } from 'src/sections/@dashboard/courses';
import CourseRightNav from 'src/sections/@dashboard/courses/CourseRightNav';
import axios from 'src/utils/axios';
// layouts

// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
PageCourses.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
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
// ----------------------------------------------------------------------

export default function PageCourses({ courses }) {
  const { themeStretch } = useSettings();

  // const isMountedRef = useIsMountedRef();

  // const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  // const sortedPosts = applySort(posts, filters);

  // const getAllPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/blog/posts/all');

  //     if (isMountedRef.current) {
  //       setPosts(response.data.posts);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMountedRef]);

  // useEffect(() => {
  //   getAllPosts();
  // }, [getAllPosts]);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Courses Page">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={0} lg={8} md={8}>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
              <CourseSearch />
              <CourseFilter query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
            </Stack>
            {/* <Grid container spacing={3}>
              {(!posts.length ? [...Array(12)] : posts).map((post, index) =>
                post ? (
                  <Grid key={post.id} item xs={12} sm={6} md={4}>
                    <CourseCard post={post} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
              )}
            </Grid> */}

            <Grid container spacing={3}>
              {(!courses?.length ? [...Array(12)] : courses).map((course, index) =>
                course ? (
                  <Grid key={course._id} item xs={12} sm={6} md={4}>
                    <CourseCard course={course} index={index} />
                  </Grid>
                ) : (
                  <SkeletonPostItem key={index} />
                )
              )}
            </Grid>
          </Grid>

          <Grid item xs={0} md={4} lg={4}>
            <CourseRightNav />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const response = await getAllCourse({
    where: { $select: ['title', 'createdAt', 'thumbnail', 'slug'] },
  });
  return {
    props: {
      courses: response.data,
    },
  };
};
