import { useCallback, useEffect, useRef } from 'react';
// @mui
import { Box, Card, Button, TextField, IconButton, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
// react-hook-form
import { FormProvider, RHFTextField, RHFUploadSingleFile } from 'src/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { LoadingButton } from '@mui/lab';
import { cloudinaryUpload } from 'src/fetching/upload.api';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
import { createPost } from 'src/fetching/post.api';
import { updatetPostUser } from 'src/fetching/auth.api';
import { useQueryClient } from 'react-query';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const { user } = useRecoilValue(authAtom);

  const queryClient = useQueryClient();

  const NewPostSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    thumbnail: Yup.mixed().test('required', 'Image is required', (value) => value !== ''),
  });

  const defaultValues = {
    content: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
    thumbnail: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPostSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'thumbnail',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.thumbnail);
    const uploadData = await cloudinaryUpload(formData);
    const newPost = await createPost({ ...data, thumbnail: uploadData, users: user._id });
    const newUser = await updatetPostUser(user._id, newPost._id);
    queryClient.invalidateQueries('posts');
    reset(defaultValues);
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // const fetching = async () => {
    //   // const res = await getAllPost({ where: { $populate: ['users'], $select: ['content'] } });
    //   // console.log('fetching :: res', res);
    //   // const res = await getAllPost({
    //   //   where: { users: user._id },
    //   // });
    //   // console.log('fetching :: res', res);
    // };
    // fetching();
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <RHFTextField
            name="content"
            multiline
            fullWidth
            rows={6}
            placeholder="Share what you are thinking here..."
            sx={{
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <RHFUploadSingleFile name="thumbnail" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
        </Stack>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
              <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
            </IconButton>
            <IconButton size="small" onClick={handleAttach}>
              <Iconify icon={'eva:attach-2-fill'} width={24} height={24} />
            </IconButton>
          </Box>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
            Post
          </LoadingButton>
        </Box>

        {/* <input ref={fileInputRef} type="file" style={{ display: 'none' }} /> */}
      </Card>
    </FormProvider>
  );
}

// export const getServerSideProps = async () => {
//   const res = await getAllPost();
//   const post = res.data;
//   return {
//     props: {
//       post,
//     },
//   };
// };
