import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from '../../components/MainCard';
import notFound from '../../assets/images/icons/401.png';

export default function Error() {
  return (
    <MainCard>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12} sx={{textAlign:'center', mt: 5}}>
            <Typography variant="h1">
              401
            </Typography>
            <Typography variant="h6">
              You lack the necessary authorization to access this resource
            </Typography>
          </Grid>
          <Grid xs={12} sx={{textAlign:'center', mt: 5}}>
            <img
              src={notFound}
              alt=""
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </MainCard>
  );
}