import { Avatar, Box, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import React from 'react';
import Image from 'src/components/Image';
import { alpha, styled } from '@mui/material/styles';
import { fDate } from 'src/utils/formatTime';
import Iconify from 'src/components/Iconify';

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Iconify icon="eva:facebook-fill" width={20} height={20} color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: <Iconify icon="ant-design:instagram-filled" width={20} height={20} color="#D7336D" />,
  },
  {
    name: 'Linkedin',
    icon: <Iconify icon="eva:linkedin-fill" width={20} height={20} color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <Iconify icon="eva:twitter-fill" width={20} height={20} color="#1C9CEA" />,
  },
];

const FooterStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  //   paddingLeft: theme.spacing(3),
  //   paddingRight: theme.spacing(2),
  //   paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(1),
  },
}));

export default function CourseDetailHero() {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Image
          alt="post cover"
          src={'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg'}
          ratio="16/9"
          sx={{ borderRadius: 2 }}
        />
      </Box>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={'author.name'} src={'author.avatarUrl'} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1">{'author.name'}</Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(Date.now())}
            </Typography>
          </Box>
        </Box>

        <SpeedDial
          direction={true ? 'left' : 'up'}
          ariaLabel="Share post"
          icon={<Iconify icon="eva:share-fill" sx={{ width: 20, height: 20 }} />}
          sx={{ '& .MuiSpeedDial-fab': { width: 48, height: 48 } }}
        >
          {SOCIALS.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="top"
              FabProps={{ color: 'default' }}
            />
          ))}
        </SpeedDial>
      </FooterStyle>

      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h3" component="h1" paragraph>
          Page One
        </Typography>
      </Box>
    </Box>
  );
}
