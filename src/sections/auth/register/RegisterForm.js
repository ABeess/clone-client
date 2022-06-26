import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, styled, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFRadioGroup, RHFTextField } from 'src/components/hook-form';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import { register } from 'src/fetching/auth.api';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  lineHeight: '40px',
}));
export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    firstName: 'Quang',
    lastName: 'Nguyen',
    gender: 'male',
    email: 'quang.nv212@gmail.com',
    password: 'nguyenquang123',
    confirmPassword: 'nguyenquang123',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await register({ data, checking: true });
      if (res?.code === 301) {
        router.push(PATH_AUTH.login);
        return enqueueSnackbar(res?.message, { variant: 'info' });
      }
      if (res?.code === 409) {
        return enqueueSnackbar(res?.message, { variant: 'info' });
      }
      // await createVerifyCodeByEmail(data);
      // setAuthState((prev) => ({ ...prev, user: data }));
      router.push(PATH_AUTH.login);
      enqueueSnackbar('Tạo mới người dùng thành công! Hãy bắt đầu ngay!');
    } catch (error) {
      enqueueSnackbar(error?.message || 'Lỗi hệ thống', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <Stack direction="row" spacing={2}>
          <LabelStyle>Gender</LabelStyle>
          <RHFRadioGroup
            name="gender"
            options={['male', 'female']}
            sx={{
              '& .MuiFormControlLabel-root': { mr: 4 },
              textTransform: 'capitalize',
            }}
          />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
