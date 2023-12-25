import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import {
  Avatar,
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
  Chip
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import MainCard from "../../components/MainCard";
import DrawIcon from "@mui/icons-material/Draw";
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
    setDeletedCustomer,
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
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell> City</TableCell>
              <TableCell> Appointment</TableCell>
              <TableCell> Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((customer) => {
              const isSelected = selected.includes(customer.id);

              return (
                <TableRow hover key={customer.id} selected={isSelected}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar src={customer?.avatar}>
                        {getInitials(customer?.email || '')}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{cursor:'pointer'}}>
                        <Link to={`/customer/${customer.id}`} component={RouterLink}>{customer.email}</Link>
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{`${customer.firstName || ''} ${customer.lastName || ''}`}</TableCell>
                  <TableCell>{`${customer.addressLineOne || ''} ${customer.addressLineTwo || ''}`}</TableCell>
                  <TableCell>{customer.city || '-'}</TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {customer?.activeAppointmentCount ? <Chip color="primary" label={`Active ${customer?.activeAppointmentCount}`} size="small"/> : ''}
                      {customer?.compleatedAppointmentCount? <Chip color="success" label={`Compleated ${customer?.compleatedAppointmentCount}`} size="small"/> : ''}
                      {customer?.invoicedAppointmentCount ? <Chip color="warning" label={`Invoiced ${customer?.invoicedAppointmentCount}`} size="small"/> : ''}
                      {customer?.deletedAppointmentCount ? <Chip color="error" label={`Deleted ${customer?.deletedAppointmentCount}`} size="small"/> : ''}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {customer?.userStatus === "active" ? (
                        <Chip color="success" label={`Active`} size="small" />
                      ) : (
                        ""
                      )}
                      {customer?.userStatus === "deleted" ? (
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
                          to={`/customer/${customer.id}`}
                          component={RouterLink}
                        >
                          <DrawIcon
                            style={{ cursor: "pointer", fontSize: 18 }}
                          />
                        </Link>

                        <DeleteSweepIcon
                          style={{
                            cursor: "pointer",
                            fontSize: 18,
                            color: "tomato",
                          }}
                          onClick={() => {setModalOpenState(true); setDeletedCustomer(customer.id)}}
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
  setModalOpenState: PropTypes.func,
  setDeletedCustomer: PropTypes.func,
};

export default ClientsTable;
