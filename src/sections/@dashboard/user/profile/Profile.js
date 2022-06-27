import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
import { getAllPost } from 'src/fetching/post.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile }) {
  const { user } = useRecoilValue(authAtom);
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fetching = async () => {
  //     try {
  //       const res = await getAllPost({ where: { users: user._id, $sort: { createdAt: -1 } } });
  //       console.log('fetching :: res', res);
  //       setPosts(res.data);
  //     } catch (error) {
  //       console.log('fetching :: error', error);
  //     }
  //   };
  //   fetching();
  // }, []);
  const queryClient = useQueryClient();

  const postsQuery = useQuery(
    'posts',
    async () => await getAllPost({ where: { users: user._id, $sort: { createdAt: -1 } } })
  );

  const posts = postsQuery?.data?.data;
  console.log('Profile :: postQuery', postsQuery);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />
          <ProfilePostCard posts={posts} />
        </Stack>
      </Grid>
    </Grid>
  );
}
