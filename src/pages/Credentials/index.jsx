import {
    Grid,
  } from "@mui/material";
  import MainCard from '../../components/MainCard';
  import CredentialTable from './CredentialTable';
  
  const Credential = () => {
    return (
      <Grid container>
        <Grid item xs={12} md={12} lg={10}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <CredentialTable />
          </MainCard>
        </Grid>
      </Grid>
    );
  };
  
  export default Credential;