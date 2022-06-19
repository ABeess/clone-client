// Mui ui
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  InputAdornment,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
// Components
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import Scrollbar from 'src/components/Scrollbar';
import TextMaxLine from 'src/components/TextMaxLine';

// ------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({}));

const CourseInfoCard = styled(Card)(({ theme }) => ({
  border: `1px dashed ${theme.palette.primary.main}`,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
}));

const BadgeOverides = styled(Badge)(({ theme }) => ({
  '& 	.MuiBadge-anchorOriginTopRight': {
    top: '2px',
    right: '-12px',
  },
}));

const CourseRightNav = () => {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <TextField
          label="Search"
          fullWidth
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify sx={{ width: 20, height: 20 }} icon="akar-icons:search" />
              </InputAdornment>
            ),
          }}
        />

        <Card sx={{ mt: 3 }}>
          <Image src="https://img2.thuthuatphanmem.vn/uploads/2019/01/04/anh-co-gai-de-thuong_025058983.jpg" />
        </Card>

        <Typography variant="h4" sx={{ fontWeight: 500, mt: 3 }}>
          Cultivate Calm and Creativity with Fun Drawing Projects
        </Typography>
        <Stack direction="row" alignItems="flex-end" sx={{ mt: 2 }}>
          <TextMaxLine line={2} variant="caption">
            Nurture yourself while you practice your drawing skills with two distinct and meditative techniques.
            One-line drawing is trendy, but it is way to break down shapes One-line drawing is trendy, but it is way to
            break down shapes
          </TextMaxLine>
          <NextLink href="/" passHref>
            <Link sx={{ fontSize: 14 }}>More</Link>
          </NextLink>
        </Stack>

        <Grid container spacing={1}>
          <Grid item xs={4}>
            <CourseInfoCard>
              <BadgeOverides>
                <Typography variant="h4" align="center" color="primary">
                  13
                </Typography>
              </BadgeOverides>
              <Typography variant="caption">Chapters</Typography>
            </CourseInfoCard>
          </Grid>
          <Grid item xs={4}>
            <CourseInfoCard>
              <BadgeOverides badgeContent="th">
                <Typography variant="h4" align="center" color="primary">
                  04
                </Typography>
              </BadgeOverides>
              <Typography variant="caption">Chapters</Typography>
            </CourseInfoCard>
          </Grid>
          <Grid item xs={4}>
            <CourseInfoCard>
              <BadgeOverides badgeContent="hrs">
                <Typography variant="h4" align="center" color="primary">
                  56
                </Typography>
              </BadgeOverides>
              <Typography variant="caption">Chapters</Typography>
            </CourseInfoCard>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
            Course Details
          </Typography>
          <Scrollbar sx={{ height: 290 }}>
            <Stack spacing={2}>
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
              <CoursDetailsCard />
            </Stack>
          </Scrollbar>
        </Box>
      </Container>
    </RootStyle>
  );
};

const CoursDetailsCard = () => {
  const BoxColorStyle = styled(Box)(({ theme }) => ({
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  }));
  return (
    <Box>
      <Card sx={{ width: 1, px: 2.5, py: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <BoxColorStyle>
            <Typography variant="subtitle1" color="common.white">
              1
            </Typography>
          </BoxColorStyle>
          <Typography variant="subtitle1" color="text.secondary">
            Introduction
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default CourseRightNav;
