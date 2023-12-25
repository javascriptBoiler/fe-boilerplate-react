import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MainCard from '../../components/MainCard';
import notFound from '../../assets/images/icons/404.png';

export default function Error() {
  return (
    <MainCard>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12} sx={{textAlign:'center', mt: 5}}>
            <Typography variant="h1">
              Opps..
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
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