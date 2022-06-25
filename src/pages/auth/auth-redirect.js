import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// routes
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// assets
import { SentIcon } from '../../assets';
import AuthSocial from 'src/sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('mail@gmail.com');

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h4" gutterBottom align="center">
                Email {email} already exists
              </Typography>
              <Typography sx={{ mb: 5 }}>
                Please choose the following two &nbsp;
                <br />
                login methods
              </Typography>

              <AuthSocial divider={false} />
            </Box>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
