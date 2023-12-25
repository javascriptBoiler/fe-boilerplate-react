import PropTypes from "prop-types";
import { SearchOutlined, PlusOutlined, DownloadOutlined, CopyOutlined } from "@ant-design/icons";
import {
  InputAdornment,
  OutlinedInput,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import MainCard from "../../components/MainCard";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ClientsSearch = ({
  downloadexcel = () => {}, 
  copytext, 
  openmessage, 
  navigatetocreate,
  downloadcsv = () => {},
  onChangeFilter = () => {},
}) => {
  return(
  <MainCard sx={{ mb: 3 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
      <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Search customer (email/ name)"
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
      <Grid item xs={12} md={6} lg={4}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<PlusOutlined style={{ fontSize: 12 }} />}
            sx={{ fontSize: "13px"}}
            onClick={navigatetocreate}
          >
            Create
          </Button>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            variant="outlined"
            color="secondary"
            startIcon={<DownloadOutlined style={{ fontSize: 12 }} />}
            sx={{ fontSize: "13px" }}
            onClick={downloadcsv}
          >
            CSV
          </Button>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            variant="outlined"
            color="secondary"
            startIcon={<DownloadOutlined style={{ fontSize: 12 }} />}
            sx={{ fontSize: "13px" }}
            onClick={downloadexcel}
          >
            Excel
          </Button>
          <Button
            disableElevation
            disabled={false}
            fullWidth
            size="large"
            variant="outlined"
            color="secondary"
            startIcon={<CopyOutlined style={{ fontSize: 12 }} />}
            sx={{ fontSize: "13px" }}
          >
            <CopyToClipboard 
              text={copytext}
              onCopy={openmessage}
            >
            <span>Copy</span>
          </CopyToClipboard>
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
