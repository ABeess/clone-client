// mui ui
import { Container, styled } from '@mui/material';
// Component
import Image from 'src/components/Image';
// Config
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
