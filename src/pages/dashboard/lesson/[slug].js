//hooks
import useSettings from 'src/hooks/useSettings';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import { LessonContent, LessonList } from 'src/sections/@dashboard/lesson';
// utils - fake API
import axiosInstance from 'src/utils/axios';
// ----------------------------------------------------------------------

CourseLesson.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CourseLesson({ data }) {
  const { themeStretch } = useSettings();
  return (
    <Page title="Lesson">
      <LessonContent />
      <LessonList data={data} />
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const res = await axiosInstance.get('https://62b2e7cc20cad3685c9694ea.mockapi.io/api/lesson/lesson');
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
