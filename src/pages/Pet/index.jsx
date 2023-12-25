import { useCallback, useMemo, useState, forwardRef, useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import PetTable from "./PetTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { setDataList, changeLoadingStatus } from "../../store/reducers/pet";
import PopConfirm from '../../components/PopConfirm'
import { endpoints } from "../../config";
import PetSearch from './PetSearch';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const usePets = (userData, page, rowsPerPage) => {
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
  const [deletedPet, setDeletedPet] = useState(undefined);

  const {
    petCount,
    pets: tableDataList,
  } = useSelector((state) => state.pet);

  const customers = usePets(tableDataList, page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  // TODO: remove this before relese
  useEffect(() => {
    dispatch(setDataList({ pets: [], petCount: 0 }));
  }, []);

  const getPets = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(endpoints.PET+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setDataList({
            pets: response.data?.pets || [],
            petCount: response.data?.petCount || 0,
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
    getPets(isMounted);
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
    navigate("/pet/new");
  };

  const handleClose = () => {
    setModalOpenState(false);
    setDeletedPet(undefined);
  }

  const handleAgree = async () => {
    //delete user
    await axiosPrivate.patch(`${endpoints.PET}/${deletedPet}`, JSON.stringify({ status: 'deleted' }), {
      headers: { "Content-Type": "application/json" },
    });
    handleClose();
    getPets(true);
  }

  const onChangeFilter = async (value) => {
    if (!value) {
      getPets(true);
    } else{
      getPets(true, `?keyword=${value}`);
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
          <PetSearch
              navigatetocreate={navigateToCreate}
              onChangeFilter={onChangeFilter}
            />

            <PetTable
              count={petCount}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              setModalOpenState={setModalOpenState}
              setDeletedPet={setDeletedPet}
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
