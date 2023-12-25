import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AppointmentForm from "../AppointmentForms/CreateAppointmen";
import MainCard from "../../../components/MainCard";
import { setAppointmentUserList, changeLoadingStatus } from "../../../store/reducers/user";
import { setDataList as setWalkerList, changeLoadingStatus as changeWalkerLoadingStatus} from "../../../store/reducers/walker";
import { setPetForAppointment, changeLoadingStatus as changePetDataLoadingStatus } from "../../../store/reducers/pet";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function CreateCustomer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const getUsers = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get("/user"+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setAppointmentUserList({
            users: response.data?.users || []
          })
        );
    } catch (err) {
      console.error(err);
    }
    dispatch(changeLoadingStatus({ isDataLoading: false }));
  };

  const getWalkers = async (isMounted, props = '') => {
    dispatch(changeWalkerLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get("/walker"+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setWalkerList({
            walkers: response.data?.walkers || [],
            walkerCount: response.data?.walkerCount || 0,
          })
        );
    } catch (err) {
      console.error(err);
    }
    dispatch(changeWalkerLoadingStatus({ isDataLoading: false }));
  };

  const getUserPets = async (props = '') => {
    dispatch(changePetDataLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get("/pet"+props);
      console.log(response.data);
        dispatch(
          setPetForAppointment({
            pets: response.data?.pets || []
          })
        );
    } catch (err) {
      console.error(err);
    }
    dispatch(changePetDataLoadingStatus({ isDataLoading: false }));
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getUsers(isMounted);
    getWalkers(isMounted);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <MainCard>
      <AppointmentForm getUsers={getUsers} getUserPets={getUserPets}/>
    </MainCard>
  );
}
