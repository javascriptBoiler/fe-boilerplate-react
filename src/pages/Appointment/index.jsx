import { useCallback, useMemo, useState, forwardRef } from "react";
import { Box, Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import AppointmentTable from "./AppointmentTable";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { setDataList, changeLoadingStatus } from "../../store/reducers/appointment";
import AppointmentSearch from './AppointmentSearch';
import PopConfirm from '../../components/PopConfirm'
import { endpoints } from "../../config";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useDataSet = (userData, page, rowsPerPage) => {
  return useMemo(() => {
    return userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [userData, page, rowsPerPage]);
};

const Page = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [isConfirmationModalOpen, setModalOpenState] = useState(false);
  const [deletedAppointment, setDeletedAppointment] = useState(undefined);


  const {
    appointmentCount,
    appointment: tableDataList,
  } = useSelector((state) => state.appointment);

  const dataSet = useDataSet(tableDataList, page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // TODO: remove this before relese
  useEffect(() => {
    dispatch(setDataList({ appointment: [], appointmentCount: 0 }));
  }, []);

  const getAppointment = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(endpoints.APPOINTMENT+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setDataList({
            appointment: response.data?.appointments || [],
            appointmentCount: response.data?.appointmentCount || 0,
          })
        );
    } catch (err) {
      console.error(err);
    }
    dispatch(changeLoadingStatus({ isDataLoading: false }));
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getAppointment(isMounted);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  

  const closeMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigateToCreate = () => {
    navigate("/appointment/new");
  };

  const handleClose = () => {
    setModalOpenState(false);
    setDeletedAppointment(undefined);
  }

  const handleAgree = async () => {
    //delete user
    await axiosPrivate.patch(`${endpoints.APPOINTMENT}/${deletedAppointment}`, JSON.stringify({ status: 'deleted' }), {
      headers: { "Content-Type": "application/json" },
    });
    handleClose();
    getAppointment(true);
  }

  const onChangeFilter = async (value) => {
    if (!value) {
      getAppointment(true);
    } else{
      getAppointment(true, `?keyword=${value}`);
    }
  }
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl" sx={{ padding: "0px !important" }}>
          <Stack>
            <AppointmentSearch
              navigatetocreate={navigateToCreate}
              onChangeFilter={onChangeFilter}
            />
            <AppointmentTable
              count={appointmentCount}
              items={dataSet}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setModalOpenState={setModalOpenState}
              setDeletedAppointment={setDeletedAppointment}
            />
          </Stack>
        </Container>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={closeMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeMessage}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copied!
          </Alert>
        </Snackbar>

        <PopConfirm open={isConfirmationModalOpen} handleClose={handleClose} handleAgree ={handleAgree}/>

      </Box>
    </>
  );
};

export default Page;
