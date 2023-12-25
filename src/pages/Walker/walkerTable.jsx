import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import DrawIcon from "@mui/icons-material/Draw";
import {
  TableContainer,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import MainCard from "../../components/MainCard";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const ClientsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setModalOpenState,
    setDeletedWalker,
  } = props;

  return (
    <MainCard>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((walker) => {
              const isSelected = selected.includes(walker.id);

              return (
                <TableRow hover key={walker.id} selected={isSelected}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography
                        variant="subtitle2"
                        sx={{ cursor: "pointer" }}
                      >
                        <Link
                          to={`/walker/${walker.id}`}
                          component={RouterLink}
                        >
                          #{walker.id}
                        </Link>
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                      {`${walker?.firstName || ""} ${walker?.lastName || ""}`}
                  </TableCell>
                  <TableCell style={{textTransform:'capitalize'}}>{walker.rate || "-"}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {walker?.status === "active" ? (
                        <Chip color="success" label={`Active`} size="small" />
                      ) : (
                        ""
                      )}
                      {walker?.status === "inactive" ? (
                        <Chip
                          color="warning"
                          label={`Inactive`}
                          size="small"
                        />
                      ) : (
                        ""
                      )}
                      {walker?.status === "deleted" ? (
                        <Chip color="error" label={`Deleted`} size="small" />
                      ) : (
                        ""
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell style={{width: 100}}>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          width:'50px'
                        }}
                      >
                        <Link
                          to={walker?.status ==='deleted' ? '#' : `/walker/${walker.id}`}
                          component={RouterLink}
                        >
                          <DrawIcon
                            style={{ cursor: walker?.status ==='deleted' ? 'not-allowed' :"pointer", fontSize: 18 }}
                          />
                        </Link>

                        <DeleteSweepIcon
                          style={{
                            cursor: "pointer",
                            fontSize: 18,
                            color: "tomato",
                          }}
                          onClick={() => {setModalOpenState(true); setDeletedWalker(walker.id)}}
                        />
                      </div>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
      />
    </MainCard>
  );
};

ClientsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  setModalOpenState: PropTypes.bool,
  setDeletedWalker: PropTypes.func,
};

export default ClientsTable;
