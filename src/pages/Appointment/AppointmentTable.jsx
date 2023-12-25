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
    setDeletedAppointment,
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
              <TableCell>Owner</TableCell>
              <TableCell>Pet Name</TableCell>
              <TableCell>Pet Colour</TableCell>
              <TableCell> Start At</TableCell>
              <TableCell> End At</TableCell>
              <TableCell>Milage Before</TableCell>
              <TableCell>Milage After</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((appointment) => {
              const isSelected = selected.includes(appointment.id);

              return (
                <TableRow hover key={appointment.id} selected={isSelected}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography
                        variant="subtitle2"
                        sx={{ cursor: "pointer" }}
                      >
                        <Link
                          to={`/appointment/${appointment.id}`}
                          component={RouterLink}
                        >
                          #{appointment.id}
                        </Link>
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/customer/${appointment.hostedBy?.id}`}
                      component={RouterLink}
                    >
                      {`${appointment.hostedBy?.firstName || ""} ${
                        appointment?.hostedBy?.lastName || ""
                      }`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/pet/${appointment.pet?.id}`}
                      component={RouterLink}
                    >
                      {`${appointment.pet?.name || ""} - (${
                        appointment.pet?.type
                      })`}
                    </Link>
                  </TableCell>
                  <TableCell>{appointment?.pet?.color || "-"}</TableCell>
                  <TableCell>{appointment.startAt || "-"}</TableCell>
                  <TableCell>{appointment.endAt || "-"}</TableCell>
                  <TableCell>{appointment.mileageBefore || "-"}</TableCell>
                  <TableCell>{appointment.mileageAfter || "-"}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {appointment?.status === "active" ? (
                        <Chip color="success" label={`Active`} size="small" />
                      ) : (
                        ""
                      )}
                      {appointment?.status === "completed" ? (
                        <Chip
                          color="primary"
                          label={`Completed`}
                          size="small"
                        />
                      ) : (
                        ""
                      )}
                      {appointment?.status === "cancelled" ? (
                        <Chip
                          color="warning"
                          label={`Cancelled`}
                          size="small"
                        />
                      ) : (
                        ""
                      )}
                      {appointment?.status === "deleted" ? (
                        <Chip color="error" label={`Deleted`} size="small" />
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
                          to={appointment?.status ==='deleted' ? '#' : `/appointment/${appointment.id}`}
                          component={RouterLink}
                        >
                          <DrawIcon
                            style={{ cursor: appointment?.status ==='deleted' ? 'not-allowed' :"pointer", fontSize: 18 }}
                          />
                        </Link>

                        <DeleteSweepIcon
                          style={{
                            cursor: "pointer",
                            fontSize: 18,
                            color: "tomato",
                          }}
                          onClick={() => {setModalOpenState(true); setDeletedAppointment(appointment.id)}}
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
  setDeletedAppointment: PropTypes.func,
};

export default ClientsTable;
