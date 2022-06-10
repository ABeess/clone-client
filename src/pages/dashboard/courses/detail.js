import { Card, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'src/components/Image';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import CourseDetailHero from 'src/sections/@dashboard/courses/CourseDetailHero';
// layouts

// ----------------------------------------------------------------------

CourseDetailPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CourseDetailPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Course Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <CourseDetailHero />
        </Card>
      </Container>
    </Page>
  );
}
