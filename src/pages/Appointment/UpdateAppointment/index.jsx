import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import UpdateAppointmentForm from "../AppointmentForms/UpdateAppointment";
import MainCard from "../../../components/MainCard";
import { setEditAppointmentDetails, changeLoadingStatus } from "../../../store/reducers/appointment";
import { setAppointmentUserList, changeLoadingStatus as changeUserLoadingStatus } from "../../../store/reducers/user";
import { setDataList as setWalkerList, changeLoadingStatus as changeWalkerLoadingStatus} from "../../../store/reducers/walker";
import { setPetForAppointment, changeLoadingStatus as changePetDataLoadingStatus } from "../../../store/reducers/pet";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function UpdateCustomer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { appointmentID }  = useParams();

  const getAppointment = async (isMounted) => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(`/appointment/${appointmentID}`);
      console.log(response.data);
      isMounted && dispatch(setEditAppointmentDetails({ appointment: response.data || {} }));
    } catch (err) {
      console.error(err);
    }
    dispatch(changeLoadingStatus({ isDataLoading: false }));
  };

  const getUsers = async (isMounted, props = '') => {
    dispatch(changeUserLoadingStatus({ isDataLoading: true }));
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
    dispatch(changeUserLoadingStatus({ isDataLoading: false }));
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
    
    getAppointment(isMounted);
    getUsers(isMounted);
    getWalkers(isMounted);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);



  return (
    <MainCard>
      <UpdateAppointmentForm getUsers={getUsers} getUserPets={getUserPets}/>
    </MainCard>
  );
}
