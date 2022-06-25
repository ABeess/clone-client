// @mui
import { Grid, Button, Divider, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthFirebaseSocial({ divider }) {
  return (
    <>
      {divider && (
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>
      )}

      <Grid container spacing={2}>
        <Grid item xs>
<<<<<<< HEAD
          <Button
            fullWidth
            size="large"
            href={`${process.env.HOST_API_KEY}/oauth/google`}
            color="inherit"
            variant="outlined"
          >
            <Iconify icon={'eva:google-fill'} color="#DF3E30" width={24} height={24} />
=======
          <Button fullWidth size="large" href={`http://localhost:3040/oauth/google`} color="inherit" variant="outlined">
            <Iconify icon="flat-color-icons:google" width={24} height={24} />
>>>>>>> 9310d36e77a2eabd0856cdc43a509950da145eaa
          </Button>
        </Grid>

        <Grid item xs>
          <Button
            fullWidth
            href={`${process.env.HOST_API_KEY}/oauth/facebook`}
            size="large"
            color="inherit"
            variant="outlined"
          >
            <Iconify icon="eva:facebook-fill" color="#1877F2" width={24} height={24} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
