// @mui
import { Box, Typography, Stack } from '@mui/material';
<<<<<<< HEAD
=======
// assets
import { UploadIllustration } from '../../assets';
>>>>>>> b8f5619ed9d2e0ef09ec931050870fe27bc1b3ff

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
<<<<<<< HEAD
      {/* <UploadIllustration sx={{ width: 220 }} /> */}
=======
      <UploadIllustration sx={{ width: 220 }} />
>>>>>>> b8f5619ed9d2e0ef09ec931050870fe27bc1b3ff

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          Drop or Select file
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Drop files here or click&nbsp;
<<<<<<< HEAD
          <Typography variant="body2" component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
=======
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
>>>>>>> b8f5619ed9d2e0ef09ec931050870fe27bc1b3ff
            browse
          </Typography>
          &nbsp;thorough your machine
        </Typography>
      </Box>
    </Stack>
  );
}
