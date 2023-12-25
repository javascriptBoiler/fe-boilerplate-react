import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import {
  InputAdornment,
  OutlinedInput,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import MainCard from "../../components/MainCard";

const ClientsSearch = ({
  navigatetocreate,
  onChangeFilter = () => {},
}) => {
return(
  <MainCard sx={{ mb: 3 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={10}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search Pet (owner name / pet name / pet color)"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          sx={{ maxWidth: 600 }}
          inputProps={{
            "aria-label": "weight",
          }}
          type="search"
          onChange={(e) => onChangeFilter(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={2}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<PlusOutlined style={{ fontSize: 12 }} />}
            sx={{ fontSize: "13px" }}
            onClick={navigatetocreate}
          >
            Create Pet
          </Button>
        </Stack>
      </Grid>
    </Grid>
  </MainCard>
);}


ClientsSearch.propTypes = {
  downloadexcel: PropTypes.func,
  copytext: PropTypes.string,
  openmessage: PropTypes.func,
  navigatetocreate: PropTypes.func,
  downloadcsv: PropTypes.func,
  onChangeFilter: PropTypes.func,
};
export default ClientsSearch;
