import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent, Link, Stack } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import { fDate } from 'src/utils/formatTime';
import { fShortenNumber } from 'src/utils/formatNumber';
import Image from 'src/components/Image';
import Iconify from 'src/components/Iconify';
import TextMaxLine from 'src/components/TextMaxLine';
import SvgIconStyle from 'src/components/SvgIconStyle';
import TextIconLabel from 'src/components/TextIconLabel';
import { PATH_DASHBOARD } from 'src/routes/path';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;

  const latestPost = index === 0 || index === 1 || index === 2;

  // if (isDesktop && latestPost) {
  //   return (
  //     <Card
  //       sx={{
  //         cursor: 'pointer',
  //       }}
  //     >
  //       <Avatar
  //         alt={author.name}
  //         src={author.avatarUrl}
  //         sx={{
  //           zIndex: 9,
  //           top: 24,
  //           left: 24,
  //           width: 40,
  //           height: 40,
  //           position: 'absolute',
  //         }}
  //       />
  //       <CourseContent title={title} view={view} comment={comment} share={share} createdAt={createdAt} index={index} />
  //       <OverlayStyle />
  //       <Image alt="cover" src={cover} sx={{ height: 360 }} />
  //     </Card>
  //   );
  // }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={cover} ratio="4/3" />
      </Box>

      <PostContent title={title} view={view} comment={comment} share={share} createdAt={createdAt} />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  comment: PropTypes.number,
  createdAt: PropTypes.string,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
};

export function PostContent({ title, view, comment, share, createdAt, index }) {
  const isDesktop = useResponsive('up', 'md');

  // const linkTo = PATH_DASHBOARD.blog.view(paramCase(title));
  const linkTo = '/';

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={2} persistent>
            {title}
          </TextMaxLine>
        </Link>
      </NextLink>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}