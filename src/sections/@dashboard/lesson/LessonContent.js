import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import Image from 'src/components/Image';
import { LESSON } from 'src/config';

// ------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  marginRight: LESSON.LIST_ITEM_WIDTH,
}));
const LessonContent = () => {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Image src="https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg" />
      </Container>
    </RootStyle>
  );
};

export default LessonContent;
