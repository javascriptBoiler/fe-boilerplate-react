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
    setDeletedPet,
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
              <TableCell>Pet Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell> Gender</TableCell>
              <TableCell> Owner</TableCell>
              <TableCell> DOB</TableCell>
              <TableCell>Weight(Kg)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Appointments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((pet) => {
              const isSelected = selected.includes(pet.id);

              return (
                <TableRow hover key={pet.id} selected={isSelected}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography
                        variant="subtitle2"
                        sx={{ cursor: "pointer" }}
                      >
                        <Link
                          to={`/pet/${pet.id}`}
                          component={RouterLink}
                        >
                          #{pet.id}
                        </Link>
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                      {`${pet?.name || ""} - (${
                        pet?.type
                      })`}
                  </TableCell>
                  <TableCell style={{textTransform:'capitalize'}}>{pet.species || "-"}</TableCell>
                  <TableCell style={{textTransform:'capitalize'}}>{pet.gender || "-"}</TableCell>
                  <TableCell style={{textTransform:'capitalize'}}>{`${pet.owner?.firstName || "-"} ${pet.owner?.lastName || "-"}`}</TableCell>
                  <TableCell>{pet.dob || "-"}</TableCell>
                  <TableCell>{pet.weight || "-"}</TableCell>

                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {pet?.status === "active" ? (
                        <Chip color="success" label={`Active`} size="small" />
                      ) : (
                        ""
                      )}
                      {pet?.status === "inactive" ? (
                        <Chip
                          color="warning"
                          label={`Inactive`}
                          size="small"
                        />
                      ) : (
                        ""
                      )}
                      {pet?.status === "deleted" ? (
                        <Chip color="error" label={`Deleted`} size="small" />
                      ) : (
                        ""
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {pet?.hostedAppointment?.length > 0 ? (
                        <Chip color="success" label={`${pet?.hostedAppointment?.length}`} size="small" />
                      ) : (
                        ""
                      )}

                      {pet?.hostedAppointment?.length === 0 ? (
                        <Chip color="warning" label={`0`} size="small" />
                      ) : (
                        ""
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
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
                          to={pet?.status ==='deleted' ? '#' : `/pet/${pet.id}`}
                          component={RouterLink}
                        >
                          <DrawIcon
                            style={{ cursor: pet?.status ==='deleted' ? 'not-allowed' :"pointer", fontSize: 18 }}
                          />
                        </Link>

                        <DeleteSweepIcon
                          style={{
                            cursor: "pointer",
                            fontSize: 18,
                            color: "tomato",
                          }}
                          onClick={() => {setModalOpenState(true); setDeletedPet(pet.id)}}
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
  setDeletedPet: PropTypes.func,
};

export default ClientsTable;
