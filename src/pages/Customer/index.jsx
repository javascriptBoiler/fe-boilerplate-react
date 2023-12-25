import { useEffect, useCallback, useMemo, useState, forwardRef } from "react";
import { Box, Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { json2csv } from "json-2-csv";

import ClientsTable from "./CustomerTable";
import ClientsSearch from "./CustomerSearch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PopConfirm from '../../components/PopConfirm'
import { setUserList, changeLoadingStatus } from "../../store/reducers/user";
import * as XLSX from "xlsx";
import { endpoints } from "../../config";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useClients = (userData, page, rowsPerPage) => {
  return useMemo(() => {
    return userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [userData, page, rowsPerPage]);
};

const Page = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [deletedCustomer, setDeletedCustomer] = useState(undefined);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [isConfirmationModalOpen, setModalOpenState] = useState(false);

  const {
    userCount,
    users: tableDataList,
  } = useSelector((state) => state.user);

  const customers = useClients(tableDataList, page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // TODO: remove this before relese
  useEffect(() => {
    dispatch(setUserList({ users: [], userCount: 0 }));
  }, []);

  const getUsers = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get("/user"+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setUserList({
            users: response.data?.users || [],
            userCount: response.data?.userCount || 0,
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
    getUsers(isMounted);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableDataList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  const downloadCsv = async () => {
    const csvData = await json2csv(tableDataList);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const openMessage = () => {
    setOpen(true);
  };

  const closeMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigateToCreate = () => {
    navigate("/customer/new");
  };

  const handleClose = () => {
    setModalOpenState(false);
    setDeletedCustomer(undefined);
  }

  const handleAgree = async () => {
    //delete user
    await axiosPrivate.patch(`${endpoints.USER}/${deletedCustomer}`, JSON.stringify({ userStatus: 'deleted' }), {
      headers: { "Content-Type": "application/json" },
    });
    handleClose();
    getUsers(true);
  }

  const onChangeFilter = async (value) => {
    if (!value) {
      getUsers(true);
    } else{
      getUsers(true, `?keyword=${value}`);
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
            <ClientsSearch
              downloadexcel={downloadExcel}
              copytext={JSON.stringify(tableDataList)}
              openmessage={openMessage}
              navigatetocreate={navigateToCreate}
              downloadcsv={downloadCsv}
              onChangeFilter={onChangeFilter}
            />
            <ClientsTable
              count={userCount}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setModalOpenState={setModalOpenState}
              setDeletedCustomer={setDeletedCustomer}
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
