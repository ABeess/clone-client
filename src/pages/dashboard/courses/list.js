import { Container, Grid, Stack } from '@mui/material';
import { orderBy } from 'lodash';
import { useState } from 'react';
import Page from 'src/components/Page';
import { SkeletonPostItem } from 'src/components/skeleton';
<<<<<<< HEAD
import { reAuthenticate } from 'src/fetching/auth.api';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
=======
import { getAllCourse } from 'src/fetching/course.api';
>>>>>>> 9310d36e77a2eabd0856cdc43a509950da145eaa
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import { CourseCard, CourseFilter, CourseSearch } from 'src/sections/@dashboard/courses';
import CourseRightNav from 'src/sections/@dashboard/courses/CourseRightNav';
// layouts
import { dehydrate, QueryClient, useQuery } from 'react-query';
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

export default function PageCourses() {
  const { themeStretch } = useSettings();

  const [filters, setFilters] = useState('latest');

  // const sortedPosts = applySort(posts, filters);

  const {
    data: { data: courses },
  } = useQuery('courses', () =>
    getAllCourse({
      where: { $select: ['title', 'createdAt', 'thumbnail', 'slug'] },
    })
  );

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Courses Page">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
<<<<<<< HEAD
          <Grid item xs={8}>
            <button
              onClick={async () => {
                const a = await reAuthenticate();
                console.log(a);
              }}
            >
              checking
            </button>
=======
          <Grid item xs={0} lg={8} md={8}>
>>>>>>> 9310d36e77a2eabd0856cdc43a509950da145eaa
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

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('courses', () =>
    getAllCourse({
      where: { $select: ['title', 'createdAt', 'thumbnail', 'slug'] },
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
