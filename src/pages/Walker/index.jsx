import { useCallback, useMemo, useState, forwardRef, useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import WalkerTable from "./walkerTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { setDataList, changeLoadingStatus } from "../../store/reducers/walker";
import PopConfirm from '../../components/PopConfirm'
import { endpoints } from "../../config";
import WalkerSearch from './WalkerSearch';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useWalker = (userData, page, rowsPerPage) => {
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
  const [deletedWalker, setDeletedWalker] = useState(undefined);

  const {
    walkerCount,
    walkers: tableDataList,
  } = useSelector((state) => state.walker);

  const walkerItems = useWalker(tableDataList, page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // TODO: remove this before relese
  useEffect(() => {
    dispatch(setDataList({ walkers: [], walkerCount: 0 }));
  }, []);

  const getWalkers = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(endpoints.WALKER+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setDataList({
            walkers: response.data?.walkers || [],
            walkerCount: response.data?.walkerCount || 0,
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
    getWalkers(isMounted);
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
    navigate("/walker/new");
  };

  const handleClose = () => {
    setModalOpenState(false);
    setDeletedWalker(undefined);
  }

  const handleAgree = async () => {
    //delete user
    await axiosPrivate.patch(`${endpoints.WALKER}/${deletedWalker}`, JSON.stringify({ status: 'deleted' }), {
      headers: { "Content-Type": "application/json" },
    });
    handleClose();
    getWalkers(true);
  }

  const onChangeFilter = async (value) => {
    if (!value) {
      getWalkers(true);
    } else{
      getWalkers(true, `?keyword=${value}`);
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
          <WalkerSearch
              navigatetocreate={navigateToCreate}
              onChangeFilter={onChangeFilter}
            />

            <WalkerTable
              count={walkerCount}
              items={walkerItems}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setModalOpenState={setModalOpenState}
              setDeletedWalker={setDeletedWalker}
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
